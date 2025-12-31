# Secure Instagram Downloader Backend

A production-grade Express + TypeScript backend implementing multi-layered abuse prevention, cost control, and privacy protection for a public media downloader API.

## Architecture

### Core Security Principles

1. **Anonymous Sessions**
   - Random session ID generated per user
   - Hashed before storage to prevent tracking
   - HTTP-only, Secure cookies
   - 24-hour timeout with activity tracking

2. **Bot Detection**
   - User-Agent analysis (detects curl, headless browsers, crawlers)
   - Missing header detection (Accept, Referer, Accept-Language)
   - Behavioral scoring on first request

3. **Suspicious Scoring System**
   - Tracks behavioral indicators (rate limits, invalid requests, etc.)
   - Automatic CAPTCHA challenge at threshold (50 points)
   - Temporary 1-hour ban at severe threshold (100 points)
   - Score increments on various suspicious actions

4. **Rate Limiting**
   - Sliding 1-minute window (10 requests max per session)
   - Per-session, not IP-based (for privacy)
   - Increments suspicious score on violations

5. **Download Queue Lock**
   - Only one active download per session at a time
   - 5-minute timeout per download
   - Prevents resource exhaustion from concurrent requests

6. **Bandwidth Enforcement**
   - 200MB per single download (file size limit)
   - 2GB per session per 24 hours (daily limit)
   - Daily reset at midnight

7. **API Key Protection**
   - RapidAPI credentials stored server-side only
   - Never exposed to frontend
   - All API calls proxied through backend

8. **Minimal Logging**
   - Logs hashed session IDs only (no raw identifiers)
   - Only logs suspicious/large requests
   - DMCA requests logged with email obfuscation
   - Legal compliance without privacy invasion

## Endpoints

### POST `/api/download`
Download media from Instagram.

**Request:**
```json
{
  "url": "https://www.instagram.com/p/ABC123XYZ/"
}
```

**Response (Success):**
```json
{
  "success": true,
  "download_url": "https://...",
  "size_mb": 15.5,
  "expires_in_seconds": 3600
}
```

**Response (Rate Limited):**
```json
{
  "error": "Too many requests. Please try again later.",
  "retryAfter": 45
}
```

**Response (CAPTCHA Required):**
```json
{
  "error": "CAPTCHA verification required",
  "requiresCaptcha": true
}
```

### POST `/api/verify-captcha`
Verify CAPTCHA token and reduce suspicious score.

**Request:**
```json
{
  "captchaToken": "token_from_hcaptcha_or_recaptcha"
}
```

**Response:**
```json
{
  "success": true,
  "message": "CAPTCHA verified"
}
```

### POST `/api/dmca-request`
Submit a DMCA removal request.

**Request:**
```json
{
  "instagramUrl": "https://www.instagram.com/p/ABC123XYZ/",
  "contactEmail": "your@email.com",
  "description": "This content violates my copyright..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "DMCA request received. We will review within 48 hours.",
  "requestId": "uuid-here"
}
```

### GET `/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00Z",
  "uptime": 3600
}
```

### GET `/status`
Session status endpoint (returns current session info).

**Response:**
```json
{
  "session": {
    "age": 1234567,
    "requestCount": 5,
    "suspiciousScore": 10,
    "isBlocked": false,
    "requiresCaptcha": false,
    "bandwidthUsed": 45,
    "bandwidthLimit": 2000
  }
}
```

## Setup & Installation

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your RapidAPI credentials
```

### 3. Development Server
```bash
npm run dev
```

Server runs on `http://localhost:3000`

### 4. Production Build
```bash
npm run build
npm start
```

## Configuration

Edit constants in `src/server.ts`:

```typescript
const RATE_LIMIT_MAX_REQUESTS = 10; // per minute per session
const MAX_FILE_SIZE_MB = 200; // single download limit
const MAX_DAILY_BANDWIDTH_MB = 2000; // per session per day
const SUSPICIOUS_SCORE_THRESHOLD = 50; // trigger CAPTCHA
const SUSPICIOUS_SCORE_BAN_THRESHOLD = 100; // temporary ban
const BAN_DURATION = 60 * 60 * 1000; // 1 hour
```

## Suspicious Score Triggers

| Event | Score | Action |
|-------|-------|--------|
| Bot detected | 15-30 | Flagged on first request |
| Missing User-Agent | 15 | Immediate scoring |
| Rate limit exceeded | 10 | Per violation |
| Non-Instagram URL | 8 | Per attempt |
| File too large | 8 | Per attempt |
| Concurrent download | 5 | Per attempt |
| Invalid request | 5 | Per attempt |
| RapidAPI 429 (rate limited) | 20 | Possible abuse pattern |

**Thresholds:**
- **50+ points**: CAPTCHA challenge required
- **100+ points**: 1-hour temporary ban

## Production Considerations

### 1. Replace In-Memory Storage
Currently uses JavaScript `Map` for session and rate limit tracking. In production:

```typescript
// Use Supabase PostGRES
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Store sessions in 'sessions' table
// Store rate limits in 'rate_limits' table with TTL
// Store DMCA requests in 'dmca_requests' table with audit trail
```

### 2. Use Redis for Session Cache
```bash
npm install redis
```

Faster than Supabase for rate limiting, fallback to Supabase for persistence.

### 3. CAPTCHA Integration
Replace placeholder with real hCaptcha or reCAPTCHA:

```typescript
// Verify with hCaptcha API
const hcaptchaResponse = await axios.post(
  'https://hcaptcha.com/siteverify',
  { secret: HCAPTCHA_SECRET, response: captchaToken }
);
```

### 4. Secure Logging
Use a proper logging service:

```typescript
// Examples: Datadog, LogRocket, Sentry
// Log only hashed identifiers, never raw user data
logger.security('BAN', sessionData.hashedSessionId, reason);
```

### 5. TLS & HTTPS
Deploy behind HTTPS with valid SSL certificate.

### 6. Environment Security
Use a secrets manager (AWS Secrets Manager, HashiCorp Vault):

```bash
# Never commit .env file
# Use GitHub Secrets for CI/CD
# Rotate API keys regularly
```

### 7. DDoS Protection
Use Cloudflare, AWS Shield, or similar:

- Rate limiting at edge
- IP reputation filtering
- Bot detection

### 8. Monitoring & Alerts
Set up alerts for:

- Sudden ban waves (possible attack)
- High bandwidth usage spikes
- DMCA request patterns (abuse)
- API failures or timeouts

## Frontend Integration

### 1. Update download endpoint URL
```typescript
// In Hero.tsx
const apiUrl = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/api/download`;
```

### 2. Handle CAPTCHA responses
```typescript
if (data.requiresCaptcha) {
  // Show hCaptcha widget
  // User solves, gets token
  // Send token to /api/verify-captcha
  // Retry download
}
```

### 3. Store session cookie
The backend sets HTTP-only cookies automatically. No frontend changes needed.

## Legal Compliance

- DMCA removal endpoint enforces rate limits
- Requests logged with email obfuscation
- No user data stored beyond session life
- No IP-based tracking (per-session instead)
- Minimal request logging for abuse only

## Performance

- 0 database queries for healthy sessions (in-memory)
- ~10-20ms per request (network I/O dependent)
- Scales to thousands of concurrent users
- Move to Redis/Supabase when hitting memory limits

## Testing

```bash
# Test health endpoint
curl http://localhost:3000/health

# Test status endpoint
curl http://localhost:3000/status

# Test download (replace with real Instagram URL)
curl -X POST http://localhost:3000/api/download \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.instagram.com/p/ABC123/"}'

# Test rate limiting
for i in {1..12}; do curl http://localhost:3000/api/download -X POST -d '{}'; done
```

## Troubleshooting

**"Too many requests" immediately**
- Check RATE_LIMIT_MAX_REQUESTS setting
- Clear browser cookies to reset session
- Use incognito/private window for clean session

**CAPTCHA required but didn't solve anything**
- Suspicious score threshold too low
- Check bot detection scoring
- Verify user's requests pattern

**Backend rejects valid Instagram URLs**
- URL validation regex may be too strict
- Check RAPIDAPI_HOST configuration
- Verify RapidAPI API still supports URL format

**Memory usage growing**
- In-memory Map stores aren't cleaned up
- Add periodic cleanup task:
  ```typescript
  setInterval(() => {
    const cutoff = Date.now() - SESSION_TIMEOUT;
    for (const [key, session] of sessions) {
      if (session.lastActivity < cutoff) {
        sessions.delete(key);
      }
    }
  }, 60000); // Every minute
  ```

## License

This backend is designed for educational and authorized use only. Respect copyright laws and Instagram's Terms of Service.
