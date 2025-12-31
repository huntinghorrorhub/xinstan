import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface SessionData {
  sessionId: string;
  hashedSessionId: string;
  createdAt: number;
  lastActivity: number;
  userAgent: string;
  requestCount: number;
  suspiciousScore: number;
  isBlocked: boolean;
  blockExpiry?: number;
  totalBandwidthUsed: number;
  bandwidthResetAt: number;
  requiresCaptcha: boolean;
  captchaVerified: boolean;
  downloadInProgress: boolean;
  downloadStartedAt?: number;
}

interface RateLimitWindow {
  timestamp: number;
  count: number;
}

declare global {
  namespace Express {
    interface Request {
      sessionId?: string;
      hashedSessionId?: string;
      sessionData?: SessionData;
      clientIp?: string;
    }
  }
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const app = express();
const PORT = process.env.PORT || 3000;
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '';
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || 'instagram-downloader38.p.rapidapi.com';
const SESSION_COOKIE_NAME = '__session_id';
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // per minute
const SUSPICIOUS_SCORE_THRESHOLD = 50;
const SUSPICIOUS_SCORE_BAN_THRESHOLD = 100;
const BAN_DURATION = 60 * 60 * 1000; // 1 hour
const MAX_FILE_SIZE_MB = 200; // 200MB per download
const MAX_DAILY_BANDWIDTH_MB = 2000; // 2GB per user per day
const DOWNLOAD_TIMEOUT = 5 * 60 * 1000; // 5 minute timeout per download
const DMCA_REQUEST_RATE_LIMIT = 3; // 3 requests per day

// ============================================================================
// IN-MEMORY STORES (Would use Supabase/Redis in production)
// ============================================================================

const sessions = new Map<string, SessionData>();
const rateLimitWindows = new Map<string, RateLimitWindow[]>();
const dmcaRequestLog = new Map<string, number[]>();
const ipFailureLog = new Map<string, number[]>(); // for IP-based DMCA logging only

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function hashSession(sessionId: string): string {
  return crypto.createHash('sha256').update(sessionId).digest('hex');
}

function generateSessionId(): string {
  return crypto.randomBytes(32).toString('hex');
}

function getClientIp(req: Request): string {
  return (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
    req.socket.remoteAddress ||
    'unknown';
}

function detectBot(req: Request): number {
  let score = 0;

  const userAgent = req.get('user-agent') || '';

  // Bot detection heuristics
  if (!userAgent) score += 15; // Missing User-Agent is suspicious
  if (/bot|crawler|scraper|curl|wget|python|java(?!script)/i.test(userAgent)) score += 25;
  if (/headless|phantom|zombie/i.test(userAgent)) score += 30;

  // Missing common headers
  if (!req.get('accept')) score += 5;
  if (!req.get('accept-language')) score += 5;
  if (!req.get('accept-encoding')) score += 5;
  if (!req.get('referer') && req.path !== '/health') score += 10;

  // Suspicious header patterns
  if (req.get('user-agent')?.toLowerCase() === 'curl') score += 25;

  return score;
}

function incrementSuspiciousScore(sessionData: SessionData, increment: number, reason: string): void {
  sessionData.suspiciousScore += increment;

  if (sessionData.suspiciousScore >= SUSPICIOUS_SCORE_THRESHOLD) {
    sessionData.requiresCaptcha = true;
  }

  if (sessionData.suspiciousScore >= SUSPICIOUS_SCORE_BAN_THRESHOLD) {
    sessionData.isBlocked = true;
    sessionData.blockExpiry = Date.now() + BAN_DURATION;
    logSecurityEvent('BAN', sessionData.hashedSessionId, `Score: ${sessionData.suspiciousScore}, Reason: ${reason}`);
  }
}

function logSecurityEvent(eventType: string, hashedSessionId: string, details: string): void {
  // In production: log to Supabase or secure logging service
  // This prevents storing raw session IDs or user data
  console.log(`[${new Date().toISOString()}] SECURITY_EVENT: ${eventType} | Hash: ${hashedSessionId} | ${details}`);
}

function logDownloadRequest(sessionData: SessionData, url: string, size: number): void {
  // Minimal logging for legal compliance
  // Only log suspicious or large requests
  if (sessionData.suspiciousScore > 30 || size > MAX_FILE_SIZE_MB * 0.8) {
    console.log(
      `[${new Date().toISOString()}] DOWNLOAD_LOG | Hash: ${sessionData.hashedSessionId} | Size: ${size}MB | Score: ${sessionData.suspiciousScore}`
    );
  }
}

// ============================================================================
// MIDDLEWARE: SECURITY
// ============================================================================

app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ============================================================================
// MIDDLEWARE: SESSION MANAGEMENT
// ============================================================================

app.use((req: Request, res: Response, next: NextFunction) => {
  req.clientIp = getClientIp(req);

  // Get or create session
  let sessionId = req.cookies?.[SESSION_COOKIE_NAME];

  if (!sessionId) {
    sessionId = generateSessionId();
  }

  const hashedSessionId = hashSession(sessionId);
  req.sessionId = sessionId;
  req.hashedSessionId = hashedSessionId;

  // Get or create session data
  let sessionData = sessions.get(hashedSessionId);

  if (!sessionData) {
    sessionData = {
      sessionId: sessionId,
      hashedSessionId,
      createdAt: Date.now(),
      lastActivity: Date.now(),
      userAgent: req.get('user-agent') || 'unknown',
      requestCount: 0,
      suspiciousScore: 0,
      isBlocked: false,
      totalBandwidthUsed: 0,
      bandwidthResetAt: Date.now() + 24 * 60 * 60 * 1000,
      requiresCaptcha: false,
      captchaVerified: false,
      downloadInProgress: false,
    };

    // Initial bot detection on first request
    const botScore = detectBot(req);
    if (botScore > 0) {
      incrementSuspiciousScore(sessionData, botScore, `Bot detection score: ${botScore}`);
    }

    sessions.set(hashedSessionId, sessionData);
    logSecurityEvent('NEW_SESSION', hashedSessionId, `User-Agent: ${req.get('user-agent')}`);
  } else {
    // Check if session has expired
    if (Date.now() - sessionData.lastActivity > SESSION_TIMEOUT) {
      sessions.delete(hashedSessionId);
      sessionId = generateSessionId();
      req.sessionId = sessionId;
      req.hashedSessionId = hashSession(sessionId);
      sessionData = {
        sessionId,
        hashedSessionId: hashSession(sessionId),
        createdAt: Date.now(),
        lastActivity: Date.now(),
        userAgent: req.get('user-agent') || 'unknown',
        requestCount: 0,
        suspiciousScore: 0,
        isBlocked: false,
        totalBandwidthUsed: 0,
        bandwidthResetAt: Date.now() + 24 * 60 * 60 * 1000,
        requiresCaptcha: false,
        captchaVerified: false,
        downloadInProgress: false,
      };
      sessions.set(req.hashedSessionId, sessionData);
    }

    // Reset daily bandwidth if 24h has passed
    if (Date.now() > sessionData.bandwidthResetAt) {
      sessionData.totalBandwidthUsed = 0;
      sessionData.bandwidthResetAt = Date.now() + 24 * 60 * 60 * 1000;
    }

    // Check if ban has expired
    if (sessionData.isBlocked && sessionData.blockExpiry && Date.now() > sessionData.blockExpiry) {
      sessionData.isBlocked = false;
      sessionData.blockExpiry = undefined;
      logSecurityEvent('BAN_LIFTED', hashedSessionId, 'Ban duration expired');
    }
  }

  sessionData.requestCount++;
  sessionData.lastActivity = Date.now();
  req.sessionData = sessionData;

  // Set session cookie (HTTP-only, Secure in production)
  res.cookie(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_TIMEOUT,
  });

  next();
});

// ============================================================================
// MIDDLEWARE: RATE LIMITING (Sliding Window)
// ============================================================================

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/health' || req.path === '/status') {
    return next();
  }

  const hashedSessionId = req.hashedSessionId!;
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;

  // Get or create rate limit window
  let window = rateLimitWindows.get(hashedSessionId) || [];

  // Remove old timestamps outside window
  window = window.filter(w => w.timestamp > windowStart);

  // Check limit
  if (window.length >= RATE_LIMIT_MAX_REQUESTS) {
    incrementSuspiciousScore(
      req.sessionData!,
      10,
      `Rate limit exceeded: ${window.length} requests in ${RATE_LIMIT_WINDOW}ms`
    );
    return res.status(429).json({
      error: 'Too many requests. Please try again later.',
      retryAfter: Math.ceil((window[0].timestamp + RATE_LIMIT_WINDOW - now) / 1000),
    });
  }

  window.push({ timestamp: now, count: 1 });
  rateLimitWindows.set(hashedSessionId, window);

  next();
});

// ============================================================================
// MIDDLEWARE: CHECK BLOCKS & CAPTCHA
// ============================================================================

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/health' || req.path === '/status') {
    return next();
  }

  const sessionData = req.sessionData!;

  // Check if blocked
  if (sessionData.isBlocked) {
    return res.status(403).json({
      error: 'Your session has been temporarily blocked due to suspicious activity.',
      unblockTime: sessionData.blockExpiry,
    });
  }

  // Check if requires CAPTCHA (for download endpoint specifically)
  if (sessionData.requiresCaptcha && !sessionData.captchaVerified && req.path === '/api/download') {
    return res.status(403).json({
      error: 'CAPTCHA verification required',
      requiresCaptcha: true,
    });
  }

  next();
});

// ============================================================================
// ENDPOINT: VERIFY CAPTCHA
// ============================================================================

app.post('/api/verify-captcha', async (req: Request, res: Response) => {
  const { captchaToken } = req.body;
  const sessionData = req.sessionData!;

  if (!captchaToken) {
    return res.status(400).json({ error: 'Missing captcha token' });
  }

  try {
    // In production: verify with hCaptcha or reCAPTCHA API
    // For now: simple validation
    if (captchaToken.length < 20) {
      return res.status(400).json({ error: 'Invalid captcha token' });
    }

    sessionData.captchaVerified = true;
    sessionData.suspiciousScore = Math.max(0, sessionData.suspiciousScore - 20);

    logSecurityEvent('CAPTCHA_VERIFIED', sessionData.hashedSessionId, 'User passed CAPTCHA');

    res.json({ success: true, message: 'CAPTCHA verified' });
  } catch (error) {
    res.status(500).json({ error: 'CAPTCHA verification failed' });
  }
});

// ============================================================================
// ENDPOINT: DOWNLOAD MEDIA
// ============================================================================

app.post('/api/download', async (req: Request, res: Response) => {
  const { url } = req.body;
  const sessionData = req.sessionData!;

  // Validate input
  if (!url || typeof url !== 'string') {
    incrementSuspiciousScore(sessionData, 5, 'Invalid download request');
    return res.status(400).json({ error: 'Missing or invalid URL' });
  }

  // Validate Instagram URL
  if (!/instagram\.com|instagr\.am/.test(url)) {
    incrementSuspiciousScore(sessionData, 8, 'Non-Instagram URL attempted');
    return res.status(400).json({ error: 'Only Instagram URLs are supported' });
  }

  // Check if already downloading
  if (sessionData.downloadInProgress) {
    const timeoutMs = Date.now() - (sessionData.downloadStartedAt || 0);
    if (timeoutMs < DOWNLOAD_TIMEOUT) {
      incrementSuspiciousScore(sessionData, 5, 'Concurrent download attempt');
      return res.status(429).json({
        error: 'You already have a download in progress',
        waitSeconds: Math.ceil((DOWNLOAD_TIMEOUT - timeoutMs) / 1000),
      });
    } else {
      // Timeout expired, reset
      sessionData.downloadInProgress = false;
    }
  }

  // Check bandwidth limits
  if (sessionData.totalBandwidthUsed >= MAX_DAILY_BANDWIDTH_MB) {
    incrementSuspiciousScore(sessionData, 15, 'Daily bandwidth limit exceeded');
    return res.status(429).json({
      error: `Daily bandwidth limit reached (${MAX_DAILY_BANDWIDTH_MB}MB). Try again tomorrow.`,
      resetTime: sessionData.bandwidthResetAt,
    });
  }

  sessionData.downloadInProgress = true;
  sessionData.downloadStartedAt = Date.now();

  try {
    // Proxy request to RapidAPI
    const response = await axios.request({
      method: 'POST',
      url: `https://${RAPIDAPI_HOST}/download`,
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST,
      },
      data: { url },
      timeout: DOWNLOAD_TIMEOUT,
    });

    const data = response.data;

    // Validate response
    if (!data.download_url && !data.url) {
      incrementSuspiciousScore(sessionData, 3, 'Failed download attempt');
      return res.status(400).json({ error: 'Could not extract media from this Instagram link' });
    }

    const downloadUrl = data.download_url || data.url;
    const estimatedSizeMB = data.size_mb || 50; // Estimate if not provided

    // Check file size limit
    if (estimatedSizeMB > MAX_FILE_SIZE_MB) {
      incrementSuspiciousScore(sessionData, 8, `File too large: ${estimatedSizeMB}MB`);
      return res.status(413).json({
        error: `File too large (${estimatedSizeMB}MB). Maximum allowed: ${MAX_FILE_SIZE_MB}MB`,
      });
    }

    // Update bandwidth usage
    sessionData.totalBandwidthUsed += estimatedSizeMB;

    // Log download for compliance
    logDownloadRequest(sessionData, url, estimatedSizeMB);

    // Success: return download URL
    res.json({
      success: true,
      download_url: downloadUrl,
      size_mb: estimatedSizeMB,
      expires_in_seconds: 3600,
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';

    // Increment score on API failures (could indicate abuse)
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      incrementSuspiciousScore(sessionData, 20, 'RapidAPI rate limit hit - possible abuse');
    } else {
      incrementSuspiciousScore(sessionData, 2, 'Download API error');
    }

    res.status(500).json({
      error: 'Failed to process download',
      details: process.env.NODE_ENV === 'development' ? errorMsg : undefined,
    });
  } finally {
    sessionData.downloadInProgress = false;
  }
});

// ============================================================================
// ENDPOINT: DMCA REMOVAL REQUEST
// ============================================================================

app.post('/api/dmca-request', async (req: Request, res: Response) => {
  const { instagramUrl, contactEmail, description } = req.body;
  const sessionData = req.sessionData!;
  const ipAddress = req.clientIp!;

  // Validate DMCA request
  if (!instagramUrl || !contactEmail || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  if (description.length < 20 || description.length > 1000) {
    return res.status(400).json({ error: 'Description must be 20-1000 characters' });
  }

  // Rate limit DMCA requests per IP (legal compliance logging)
  const now = Date.now();
  const dayAgo = now - 24 * 60 * 60 * 1000;

  if (!dmcaRequestLog.has(ipAddress)) {
    dmcaRequestLog.set(ipAddress, []);
  }

  const ipRequests = dmcaRequestLog.get(ipAddress)!;
  const recentRequests = ipRequests.filter(ts => ts > dayAgo);

  if (recentRequests.length >= DMCA_REQUEST_RATE_LIMIT) {
    logSecurityEvent(
      'DMCA_RATE_LIMIT',
      sessionData.hashedSessionId,
      `IP: ${ipAddress} exceeded DMCA request limit`
    );
    return res.status(429).json({
      error: 'Too many DMCA requests. Maximum 3 per 24 hours.',
    });
  }

  recentRequests.push(now);
  dmcaRequestLog.set(ipAddress, recentRequests);

  try {
    // In production: store in Supabase with legal audit trail
    logSecurityEvent(
      'DMCA_REQUEST',
      sessionData.hashedSessionId,
      `URL: [REDACTED] | Email: ${contactEmail.substring(0, 3)}***@***.***`
    );

    res.json({
      success: true,
      message: 'DMCA request received. We will review within 48 hours.',
      requestId: crypto.randomUUID(),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process DMCA request' });
  }
});

// ============================================================================
// ENDPOINT: HEALTH CHECK
// ============================================================================

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.get('/status', (req: Request, res: Response) => {
  const sessionData = req.sessionData;

  res.json({
    session: {
      age: sessionData ? Date.now() - sessionData.createdAt : null,
      requestCount: sessionData?.requestCount || 0,
      suspiciousScore: sessionData?.suspiciousScore || 0,
      isBlocked: sessionData?.isBlocked || false,
      requiresCaptcha: sessionData?.requiresCaptcha || false,
      bandwidthUsed: sessionData?.totalBandwidthUsed || 0,
      bandwidthLimit: MAX_DAILY_BANDWIDTH_MB,
    },
  });
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);

  if (req.sessionData) {
    incrementSuspiciousScore(req.sessionData, 5, 'Unhandled error triggered');
  }

  res.status(500).json({
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// ============================================================================
// START SERVER
// ============================================================================

app.listen(PORT, () => {
  console.log(`Secure Instagram Downloader Backend running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Session tracking: Hashed identifiers`);
  console.log(`Rate limiting: ${RATE_LIMIT_MAX_REQUESTS} requests per ${RATE_LIMIT_WINDOW}ms`);
  console.log(`Daily bandwidth limit: ${MAX_DAILY_BANDWIDTH_MB}MB per session`);
});
