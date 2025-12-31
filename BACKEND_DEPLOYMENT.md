# Backend Deployment Guide

Complete guide to deploying the secure Instagram downloader backend.

## Local Development

### 1. Start Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your RapidAPI key
npm run dev
```

Backend runs on `http://localhost:3000`

### 2. Start Frontend
```bash
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## Production Deployment

### Option 1: Railway (Recommended for Quick Deploy)

1. **Create Railway Account**
   - Visit https://railway.app
   - Sign in with GitHub

2. **Connect Repository**
   - Create new project
   - Connect your GitHub repo

3. **Configure Backend Service**
   ```bash
   # In Railway project, add new service from GitHub
   # Select the backend directory
   ```

4. **Set Environment Variables**
   - `NODE_ENV`: `production`
   - `PORT`: `3000` (Railway auto-assigns)
   - `RAPIDAPI_KEY`: Your RapidAPI key
   - `RAPIDAPI_HOST`: `instagram-downloader38.p.rapidapi.com`
   - `FRONTEND_URL`: Your production frontend domain

5. **Deploy**
   - Railway auto-deploys on push to main
   - Get your backend URL from Railway dashboard

### Option 2: Docker + Any Cloud Provider

1. **Create Dockerfile**
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm ci --only=production

COPY backend/dist ./dist
COPY backend/tsconfig.json ./

EXPOSE 3000

CMD ["node", "dist/server.js"]
```

2. **Build Image**
```bash
docker build -t instagram-downloader-backend .
```

3. **Deploy to Cloud**
   - **AWS EC2**: Push to ECR, deploy with ECS/EKS
   - **Google Cloud Run**: `gcloud run deploy`
   - **Azure**: Azure Container Instances
   - **DigitalOcean**: App Platform

### Option 3: Self-Hosted VPS

1. **SSH into Server**
```bash
ssh root@your-vps-ip
```

2. **Install Node.js & Dependencies**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y nginx
```

3. **Clone Repository**
```bash
git clone your-repo-url
cd your-repo/backend
npm install
```

4. **Build Backend**
```bash
npm run build
```

5. **Configure Environment**
```bash
cp .env.example .env
# Edit .env with production values
nano .env
```

6. **Set Up PM2 (Process Manager)**
```bash
sudo npm install -g pm2
pm2 start dist/server.js --name "instagram-backend"
pm2 startup
pm2 save
```

7. **Configure Nginx Reverse Proxy**
```nginx
server {
    listen 80;
    server_name backend.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $remote_addr;
    }
}
```

8. **Enable HTTPS with Let's Encrypt**
```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot certonly --nginx -d backend.yourdomain.com
```

## Production Checklist

### Security
- [ ] Enable HTTPS/TLS (mandatory)
- [ ] Set `NODE_ENV=production`
- [ ] Set `secure: true` in cookie options
- [ ] Use strong, randomly generated secrets
- [ ] Enable CORS only for your frontend domain
- [ ] Rate limit at reverse proxy (Nginx/CloudFlare)
- [ ] Set up DDoS protection (CloudFlare/AWS Shield)

### Monitoring & Logging
- [ ] Set up centralized logging (LogRocket, Datadog, Sentry)
- [ ] Monitor error rates and response times
- [ ] Set up alerts for:
  - High ban rates (possible attack)
  - API failures
  - Bandwidth spikes
  - Memory usage

### Database (For Production)
Replace in-memory Maps with persistent storage:

```typescript
// Install Supabase client
npm install @supabase/supabase-js

// Initialize in server.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Store sessions in 'sessions' table
// Query during request:
const { data: sessionData } = await supabase
  .from('sessions')
  .select('*')
  .eq('hashed_session_id', hashedSessionId)
  .single();
```

### Caching (For Scale)
Add Redis for faster session/rate limit tracking:

```bash
npm install redis
```

```typescript
import { createClient } from 'redis';

const redis = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

// Use Redis for rate limiting (microsecond response times)
const rateLimitKey = `rate_limit:${hashedSessionId}`;
const count = await redis.incr(rateLimitKey);
await redis.expire(rateLimitKey, 60); // 1 minute window
```

### API Keys & Secrets
- Use a secrets manager in production:
  - AWS Secrets Manager
  - HashiCorp Vault
  - Supabase Vault
  - GitHub Secrets (for CI/CD)

- Rotate API keys regularly
- Never commit `.env` files
- Use different keys for dev/staging/production

## Update Frontend Domain

After deploying backend, update frontend:

1. **Update .env**
```env
VITE_BACKEND_URL=https://backend.yourdomain.com
```

2. **Rebuild Frontend**
```bash
npm run build
```

3. **Deploy Frontend**
   - Vercel: Auto-deploys on push
   - Netlify: Auto-deploys on push
   - AWS S3 + CloudFront: `aws s3 sync dist/ s3://bucket-name/`

## Monitoring Commands

Monitor backend health:

```bash
# Check health endpoint
curl https://backend.yourdomain.com/health

# Get session status
curl https://backend.yourdomain.com/status --cookie "session=..."

# Monitor logs (if using PM2)
pm2 logs instagram-backend

# Monitor system resources
pm2 monit
```

## Troubleshooting

### Backend not responding
```bash
# Check if service is running
pm2 list

# View logs for errors
pm2 logs instagram-backend --lines 50

# Restart service
pm2 restart instagram-backend
```

### CORS errors
- Verify `FRONTEND_URL` environment variable
- Check browser console for actual error
- Ensure HTTPS is used in production

### Session not persisting
- Check cookies are being set (browser DevTools → Application → Cookies)
- Verify `httpOnly` flag in production
- Ensure domain matches

### High memory usage
- Implement session cleanup (remove old sessions every hour)
- Add TTL to Redis keys
- Monitor with `pm2 monit`

### RapidAPI rate limit errors
- Upgrade RapidAPI plan
- Implement longer backoff between retries
- Cache results when possible

## Cost Optimization

**Estimated Monthly Costs:**

| Service | Usage | Cost |
|---------|-------|------|
| Server (VPS) | 1 vCPU, 1GB RAM | $5-10 |
| RapidAPI | ~100 downloads/day | $0-5 |
| Database (Supabase) | Generous free tier | $0-25 |
| CDN/DDoS (CloudFlare) | Free tier | $0-20 |
| **Total** | | **$5-60/month** |

### Ways to Save:
1. Start with free tier services
2. Use in-memory caching for sessions (first 30 days)
3. Implement aggressive rate limiting
4. Monitor bandwidth usage
5. Consider request batching/caching for RapidAPI

## Next Steps

1. Deploy backend to production
2. Update `VITE_BACKEND_URL` in frontend
3. Test full flow: upload → backend → download
4. Monitor error rates and user feedback
5. Gradually increase rate limits as you observe traffic patterns
6. Consider advanced features:
   - Bulk download support
   - Browser extension
   - API for third-party developers
