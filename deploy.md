# 🚨 URGENT: Fix Vercel Deployment Issue

Your frontend `mnc-solution.vercel.app` is not showing products because it's trying to connect to localhost instead of your deployed backend.

## 🔧 Quick Fix Steps:

### Step 1: Deploy Backend to Vercel

1. **Go to Vercel Dashboard** → New Project
2. **Import your GitHub repository**
3. **Configure the project:**
   - Framework Preset: `Node.js`
   - Root Directory: `./` (root of your project)
   - Build Command: Leave empty
   - Output Directory: Leave empty
   - Install Command: `npm install`

4. **Set Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://mle331818:fUHKho52UwPsmPwQ@mnc.u1irpbo.mongodb.net/?retryWrites=true&w=majority&appName=mnc
   NODE_ENV=production
   ```

5. **Deploy** and note your backend URL (e.g., `https://mnc-solution-backend.vercel.app`)

### Step 2: Update Frontend API URL

1. **Go to your frontend Vercel project** (`mnc-solution.vercel.app`)
2. **Go to Settings** → Environment Variables
3. **Add:**
   ```
   VITE_API_BASE_URL=https://your-backend-url.vercel.app/api
   ```
4. **Redeploy** the frontend

### Step 3: Update CORS in Backend

After backend deployment, update `server/index.js`:

```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://mnc-solution.vercel.app', 'https://mnc-solution.com']
    : ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:8081'],
  credentials: true
}));
```

### Step 4: Test the Connection

1. Visit: `https://your-backend-url.vercel.app/api/health`
2. Should return: `{"status":"OK","mongodb":"connected"}`

## 🚨 Alternative Quick Fix:

If you want to use the same Vercel project for both frontend and backend:

1. **Update your current Vercel project** (`mnc-solution.vercel.app`)
2. **Add Environment Variable:**
   ```
   VITE_API_BASE_URL=https://mnc-solution.vercel.app/api
   ```
3. **Redeploy**

This will make your frontend use the same domain for the API.

## 🔍 Debug Steps:

1. **Check Browser Console** on `mnc-solution.vercel.app`
2. **Look for API errors** - they'll show the wrong URL
3. **Test API directly** by visiting the health endpoint

## 📞 Need Help?

The issue is that your frontend is trying to connect to `localhost:4000` instead of your deployed backend. Once you set the correct `VITE_API_BASE_URL`, it will work! 