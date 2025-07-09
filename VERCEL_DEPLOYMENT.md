# 🚨 VERCEL DEPLOYMENT FIX

Your website `mnc-solution.vercel.app` is not showing products because the backend API is not deployed. Here's how to fix it:

## 🔧 STEP 1: Set Environment Variables in Vercel

1. **Go to your Vercel Dashboard** → `mnc-solution` project
2. **Go to Settings** → Environment Variables
3. **Add these variables:**

```
MONGODB_URI=mongodb+srv://mle331818:fUHKho52UwPsmPwQ@mnc.u1irpbo.mongodb.net/?retryWrites=true&w=majority&appName=mnc
NODE_ENV=production
```

4. **Click "Save"**

## 🔧 STEP 2: Redeploy Your Project

1. **Go to Deployments tab**
2. **Click "Redeploy"** on your latest deployment
3. **Wait for deployment to complete**

## 🔧 STEP 3: Test the API

After deployment, test these URLs:

1. **Health Check:** `https://mnc-solution.vercel.app/api/health`
   - Should return: `{"status":"OK","mongodb":"connected"}`

2. **Products API:** `https://mnc-solution.vercel.app/api/products`
   - Should return your products data

## 🔧 STEP 4: Check Browser Console

1. **Open** `https://mnc-solution.vercel.app`
2. **Open Developer Tools** (F12)
3. **Go to Console tab**
4. **Look for any API errors**

## 🚨 If Still Not Working:

### Option A: Create Separate Backend Project

1. **Create new Vercel project** for backend only
2. **Set root directory** to `./server`
3. **Set environment variables** (MONGODB_URI)
4. **Deploy** and get backend URL
5. **Update frontend** to use new backend URL

### Option B: Use Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel --prod
```

## 🔍 Debug Steps:

1. **Check Vercel Function Logs:**
   - Go to Functions tab in Vercel
   - Look for `/api/health` function
   - Check for errors

2. **Test API directly:**
   ```bash
   curl https://mnc-solution.vercel.app/api/health
   ```

3. **Check MongoDB connection:**
   - Verify your MongoDB Atlas cluster is accessible
   - Check IP whitelist settings

## 📞 Quick Fix Commands:

```bash
# Commit and push changes
git add .
git commit -m "Fix Vercel deployment"
git push

# The deployment should automatically trigger
```

## 🎯 Expected Result:

After following these steps, your website should:
- ✅ Show products on the homepage
- ✅ Load products by category
- ✅ Allow admin login and product management
- ✅ Have working search functionality

**The key issue is that your backend API needs to be deployed and accessible at `https://mnc-solution.vercel.app/api`** 