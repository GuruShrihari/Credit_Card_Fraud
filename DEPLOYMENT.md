# Deployment Guide

## Overview

This guide covers deploying both the FastAPI backend and React frontend to production.

---

## Backend Deployment

### Option 1: Render.com (Recommended - Free Tier Available)

1. **Create `render.yaml` in project root:**

```yaml
services:
  - type: web
    name: fraud-detection-api
    env: python
    buildCommand: "pip install -r backend/requirements.txt"
    startCommand: "cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT"
    envVars:
      - key: PYTHON_VERSION
        value: 3.10.0
```

2. **Push to GitHub and connect to Render**
3. **Deploy automatically on push**

### Option 2: Railway.app

1. **Create `Procfile` in backend folder:**

```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

2. **Connect GitHub repo to Railway**
3. **Set root directory to `/backend`**

### Option 3: Docker Deployment

1. **Create `backend/Dockerfile`:**

```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

2. **Build and run:**

```bash
docker build -t fraud-detection-api ./backend
docker run -p 8000:8000 fraud-detection-api
```

### Option 4: AWS EC2

```bash
# SSH into EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install dependencies
sudo apt update
sudo apt install python3-pip python3-venv nginx

# Clone repo
git clone your-repo-url
cd Credit_Card_Fraud

# Setup virtual environment
python3 -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt

# Run with systemd
sudo nano /etc/systemd/system/fraud-api.service
```

**Service file:**
```ini
[Unit]
Description=Fraud Detection API
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/Credit_Card_Fraud/backend
Environment="PATH=/home/ubuntu/Credit_Card_Fraud/venv/bin"
ExecStart=/home/ubuntu/Credit_Card_Fraud/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable fraud-api
sudo systemctl start fraud-api
```

---

## Frontend Deployment

### Option 1: Vercel (Recommended - Free Tier)

1. **Install Vercel CLI:**

```bash
npm i -g vercel
```

2. **Deploy:**

```bash
cd frontend
vercel
```

3. **Configure environment variables in Vercel dashboard:**
   - `VITE_API_URL=https://your-backend-url.com`

4. **Auto-deploy on GitHub push**

### Option 2: Netlify

1. **Create `frontend/netlify.toml`:**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. **Deploy via Netlify CLI or GitHub integration**

3. **Set environment variable:**
   - `VITE_API_URL=https://your-backend-url.com`

### Option 3: Static Hosting (S3, GitHub Pages, etc.)

```bash
cd frontend

# Update API URL in code
# Edit src/pages/LiveDetection.jsx, Model.jsx, Dashboard.jsx
# Change: const API_URL = 'https://your-backend-url.com'

# Build
npm run build

# Upload dist/ folder to hosting service
```

---

## Environment Variables

### Backend

Create `backend/.env` (for local development):

```env
# CORS origins (comma-separated)
ALLOWED_ORIGINS=http://localhost:5173,https://your-frontend-url.com

# Model path
MODEL_PATH=model.pkl

# Environment
ENVIRONMENT=production
```

Update `backend/main.py` to use env vars:

```python
import os
from dotenv import load_dotenv

load_dotenv()

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    ...
)
```

### Frontend

Create `frontend/.env.production`:

```env
VITE_API_URL=https://your-backend-url.com
```

Update code to use env var:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
```

---

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.10'
      - name: Install dependencies
        run: |
          pip install -r backend/requirements.txt
      - name: Run tests
        run: |
          cd backend
          pytest
      # Add deployment steps

  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
      - name: Build
        run: |
          cd frontend
          npm run build
      # Add deployment steps
```

---

## SSL/HTTPS Setup

### Using Nginx (for VPS deployment)

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name api.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Get SSL certificate:
```bash
sudo certbot --nginx -d api.yourdomain.com
```

---

## Performance Optimization

### Backend

1. **Enable gzip compression:**

```python
from fastapi.middleware.gzip import GZipMiddleware
app.add_middleware(GZipMiddleware, minimum_size=1000)
```

2. **Add caching for model info:**

```python
from functools import lru_cache

@lru_cache()
def get_cached_model_info():
    return model_info
```

3. **Use gunicorn with multiple workers:**

```bash
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Frontend

1. **Already optimized with Vite:**
   - Code splitting
   - Tree shaking
   - Minification

2. **Enable CDN caching**

3. **Lazy load pages:**

```javascript
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('./pages/Dashboard'))

// In routes:
<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
```

---

## Monitoring

### Backend Health Check

```python
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "model_loaded": pipeline is not None
    }
```

### Logging

```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.post("/predict")
def predict(transaction: TransactionInput):
    logger.info(f"Prediction request: {transaction.Amount}")
    # ... rest of code
```

### Error Tracking

Consider integrating:
- **Sentry** for error tracking
- **LogRocket** for frontend monitoring
- **DataDog** for full-stack observability

---

## Cost Estimation

### Free Tier Options

- **Backend:** Render.com free tier (512MB RAM)
- **Frontend:** Vercel/Netlify free tier
- **Total:** $0/month for demo project

### Production Scale

- **Backend:** $7-20/month (1-2GB RAM)
- **Frontend:** $0-10/month (CDN bandwidth)
- **Database:** $0 (using model.pkl file)
- **Total:** ~$10-30/month

---

## Checklist Before Deployment

- [ ] Update API URL in frontend
- [ ] Add CORS origins for production domain
- [ ] Generate and commit model.pkl
- [ ] Test all API endpoints
- [ ] Test frontend with production API
- [ ] Set up error monitoring
- [ ] Configure environment variables
- [ ] Enable HTTPS/SSL
- [ ] Set up automated backups
- [ ] Document deployment process
- [ ] Test mobile responsiveness
- [ ] Check browser compatibility

---

## Troubleshooting

### Backend not accessible
- Check firewall rules
- Verify port is open
- Check CORS settings
- Review logs: `journalctl -u fraud-api -f`

### Frontend can't connect to API
- Verify API URL is correct
- Check CORS settings on backend
- Ensure API is running
- Check browser console for errors

### Model not loading
- Ensure model.pkl exists in backend folder
- Check file permissions
- Verify scikit-learn version matches

---

## Support

For deployment issues:
1. Check logs first
2. Review this guide
3. Consult hosting provider docs
4. Open GitHub issue with error details
