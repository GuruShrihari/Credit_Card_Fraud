# Vercel Deployment Guide

## Overview
This guide walks you through deploying the Credit Card Fraud Detection application to Vercel. We'll deploy the frontend to Vercel and guide you on backend hosting options.

## Prerequisites
- Vercel account (free tier works)
- Git repository (GitHub, GitLab, or Bitbucket)
- Backend hosted separately (see Backend Hosting Options below)

## Option 1: Deploy Frontend Only to Vercel (Recommended)

### Step 1: Prepare Your Repository
```bash
# Ensure your code is committed
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Deploy Frontend to Vercel

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com
   - Sign in with your GitHub account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your Git repository
   - Select the repository containing your project

3. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Environment Variables**
   - Click "Environment Variables"
   - Add the following:
     ```
     VITE_API_URL=https://your-backend-url.com
     ```
   - Replace `your-backend-url.com` with your actual backend URL

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (~2-3 minutes)
   - Your frontend will be live at `https://your-project.vercel.app`

### Step 3: Host Your Backend (Choose One)

#### Option A: Railway.app (Recommended)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
cd backend
railway init

# Deploy
railway up

# Set environment
railway add

# Your backend will be live at https://your-app.railway.app
```

#### Option B: Render.com
1. Create account at https://render.com
2. Click "New +" → "Web Service"
3. Connect your repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free
5. Deploy

#### Option C: Heroku
```bash
# Install Heroku CLI
# Create Procfile in backend directory
echo "web: uvicorn main:app --host 0.0.0.0 --port $PORT" > backend/Procfile

# Deploy
cd backend
heroku create your-fraud-detection-api
git subtree push --prefix backend heroku main
```

### Step 4: Update Frontend Environment Variable
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update `VITE_API_URL` with your backend URL
3. Redeploy: Go to Deployments → Click ⋯ → "Redeploy"

## Option 2: Deploy Backend as Vercel Serverless Functions

⚠️ **Note**: FastAPI apps require adaptation for Vercel serverless. This is more complex.

### Create Vercel Backend Configuration

1. **Create `backend/vercel.json`**:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "main.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "main.py"
    }
  ]
}
```

2. **Modify `backend/main.py`** (add at the end):
```python
# For Vercel serverless
from mangum import Mangum
handler = Mangum(app)
```

3. **Update `backend/requirements.txt`**:
```txt
fastapi==0.115.0
uvicorn==0.32.0
pydantic==2.12.5
scikit-learn==1.8.0
imbalanced-learn==0.14.1
joblib==1.5.3
numpy
pandas
mangum==0.18.0
```

4. **Deploy Backend to Vercel**:
   - Import project again
   - Root Directory: `backend`
   - Framework: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)

5. **Update Frontend Environment Variable**:
   ```
   VITE_API_URL=https://your-backend.vercel.app
   ```

## Environment Variables Reference

### Frontend (.env.production)
```bash
VITE_API_URL=https://your-backend-url.com
```

### Backend (if needed)
```bash
# Add any backend-specific environment variables
ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

## Verification

### Test Your Deployment
1. Visit your Vercel frontend URL
2. Navigate to "Live Detection" page
3. Try a sample transaction
4. Check if the prediction works

### Debug Issues
- **CORS Error**: Update CORS origins in `backend/main.py`
- **API URL Error**: Check environment variables in Vercel dashboard
- **Build Failed**: Check build logs in Vercel deployment tab

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate provisioning (~10 minutes)

## Continuous Deployment

Vercel automatically redeploys when you push to your main branch:
```bash
git add .
git commit -m "Update feature"
git push origin main
# Vercel auto-deploys
```

## Monitoring & Analytics

- **Vercel Analytics**: Enable in Project Settings → Analytics
- **Backend Logs**: Use your hosting provider's dashboard
- **Error Tracking**: Consider adding Sentry for production

## Troubleshooting

### Frontend Issues
```bash
# Test build locally
cd frontend
npm run build
npm run preview
```

### Backend Issues
```bash
# Test backend locally
cd backend
python main.py
# Test at http://localhost:8000
```

### Common Errors

**1. Module not found**
- Ensure all dependencies in requirements.txt / package.json
- Clear build cache: Vercel Dashboard → Deployments → Settings → Clear Cache

**2. CORS errors**
- Update `allow_origins` in main.py to include your Vercel frontend URL
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://your-project.vercel.app"  # Add this
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**3. 404 on page refresh**
- Ensure `vercel.json` has proper rewrites
- Already configured in your frontend/vercel.json

**4. Model file not found**
- Ensure model.pkl is committed to git
- Check file size (max 100MB for Vercel)
- Consider using external storage (S3, GCS) for large models

## Cost Estimation

### Free Tier Limits
- **Vercel Frontend**: 100GB bandwidth/month, 6000 build minutes/month
- **Railway Backend**: 500 hours/month, $5 credit
- **Render Backend**: 750 hours/month free tier

For a portfolio project, free tiers are sufficient.

## Security Checklist

- [ ] Remove sensitive data from code
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Configure CORS properly
- [ ] Add rate limiting (consider Vercel's API routes)
- [ ] Monitor usage and costs

## Next Steps

1. Deploy frontend to Vercel
2. Choose and deploy backend hosting
3. Update VITE_API_URL environment variable
4. Test all features in production
5. Add custom domain (optional)
6. Share your portfolio project!

## Support

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs

---

**Your deployment URL will be**: `https://credit-card-fraud-detection-[random].vercel.app`

Ready to deploy? Follow the steps above and your project will be live in minutes! 🚀
