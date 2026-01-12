# 🚀 Quick Deployment Checklist

## Pre-Deployment
- [x] Frontend updated to use environment variables
- [x] Vercel configuration files created
- [x] CORS configured in backend
- [ ] Code pushed to GitHub/GitLab/Bitbucket

## Frontend Deployment (Vercel)
- [ ] Create Vercel account
- [ ] Import Git repository
- [ ] Configure build settings:
  - Root Directory: `frontend`
  - Framework: Vite
  - Build Command: `npm run build`
  - Output Directory: `dist`
- [ ] Add environment variable: `VITE_API_URL` (leave empty for now)
- [ ] Deploy frontend
- [ ] Note your frontend URL: `https://__________.vercel.app`

## Backend Deployment (Choose One)

### Option A: Railway.app (Easiest)
- [ ] Create Railway account
- [ ] Install Railway CLI: `npm i -g @railway/cli`
- [ ] From backend folder: `railway init`
- [ ] Deploy: `railway up`
- [ ] Note your backend URL: `https://__________.railway.app`

### Option B: Render.com
- [ ] Create Render account
- [ ] New Web Service → Connect repository
- [ ] Configure:
  - Root: `backend`
  - Build: `pip install -r requirements.txt`
  - Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- [ ] Deploy
- [ ] Note your backend URL: `https://__________.onrender.com`

## Post-Deployment
- [ ] Update Vercel environment variable:
  - `VITE_API_URL=https://your-backend-url.com`
- [ ] Redeploy frontend (to apply new env var)
- [ ] Update backend CORS in `main.py`:
  ```python
  allow_origins=[
      "http://localhost:5173",
      "https://your-frontend.vercel.app"  # Add this
  ]
  ```
- [ ] Redeploy backend

## Testing
- [ ] Visit frontend URL
- [ ] Test Home page loads
- [ ] Test Live Detection with sample data
- [ ] Check Model page loads metrics
- [ ] Verify Dashboard shows statistics
- [ ] Test mobile responsiveness

## Optional Enhancements
- [ ] Add custom domain
- [ ] Enable Vercel Analytics
- [ ] Set up error monitoring (Sentry)
- [ ] Add rate limiting
- [ ] Configure CI/CD

## URLs to Remember
```
Frontend: https://__________.vercel.app
Backend:  https://__________.railway.app (or .onrender.com)
GitHub:   https://github.com/__________/__________
```

## Estimated Time
- Frontend deployment: 5 minutes
- Backend deployment: 10 minutes
- Configuration & testing: 10 minutes
- **Total: ~25 minutes**

## Need Help?
- Frontend issues: Check Vercel deployment logs
- Backend issues: Check Railway/Render logs
- CORS errors: Update allow_origins in main.py
- API connection: Verify VITE_API_URL is correct

---

**Current Status**: ✅ Ready to deploy! All files configured.

**Next Step**: Push your code to GitHub, then follow the Frontend Deployment steps.
