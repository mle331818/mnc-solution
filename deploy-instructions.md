# 🚀 MNCC2 Admin System Deployment Instructions

## **Current Issue**
The admin dashboard is showing "offline" because the API endpoints are returning HTML instead of JSON. This means the Vercel routing isn't working correctly.

## **What I've Fixed**
✅ Created proper Vercel serverless function structure (`api/admin/index.js`)  
✅ Updated Vercel configuration (`vercel.json`)  
✅ Fixed API routing to use `/api/admin/index.js`  
✅ Removed conflicting old admin.js file  

## **Next Steps (You Must Do This)**

### **1. Set Environment Variables in Vercel**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (`mnc-solution`)
3. Go to **Settings** → **Environment Variables**
4. Add these variables:
   - **Name**: `MONGODB_URI`
   - **Value**: `mongodb+srv://mle331818:fUHKho52UwPsmPwQ@mnc.u1irpbo.mongodb.net/?retryWrites=true&w=majority&appName=mnc`
   - **Environment**: Production
   
   - **Name**: `NODE_ENV`
   - **Value**: `production`
   - **Environment**: Production

### **2. Redeploy Your Project**
1. In Vercel Dashboard, go to **Deployments**
2. Click **Redeploy** on your latest deployment
3. Wait for the deployment to complete

### **3. Test the Admin System**
After redeployment, test these URLs:

**API Endpoints:**
- https://mnc-solution.vercel.app/api/admin/health
- https://mnc-solution.vercel.app/api/admin/db-status
- https://mnc-solution.vercel.app/api/admin/products

**Admin Dashboard:**
- https://mnc-solution.vercel.app/admin
- **Login**: `admin` / `admin123`

## **Expected Results**
✅ API endpoints should return JSON, not HTML  
✅ Database status should show "connected: true"  
✅ Admin dashboard should load and show products  
✅ You should be able to login and manage products  

## **If Still Not Working**
1. Check Vercel Function Logs (Deployments → View Function Logs)
2. Verify environment variables are set correctly
3. Make sure MongoDB Atlas is accessible
4. Check if the deployment completed successfully

## **Quick Test Commands**
```bash
# Test API endpoints
curl https://mnc-solution.vercel.app/api/admin/health
curl https://mnc-solution.vercel.app/api/admin/db-status
```

**The admin system will work once you set the environment variables and redeploy!**

## Deployment Instructions

## Prerequisites
1. A Vercel account
2. MongoDB Atlas account with a database set up
3. Your project pushed to GitHub

## Step 1: Environment Variables
Set up the following environment variables in your Vercel project:

1. `MONGODB_URI`: Your MongoDB connection string
   - Go to MongoDB Atlas
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

2. `NODE_ENV`: Set to "production"

## Step 2: Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. Click "Deploy"

## Step 3: Verify Deployment

1. Wait for the deployment to complete
2. Run the verification script:
   ```bash
   node deploy-verification.js
   ```
3. Check all endpoints are working:
   - Health check: `https://your-domain.vercel.app/api/admin/health`
   - Database status: `https://your-domain.vercel.app/api/admin/db-status`
   - Products API: `https://your-domain.vercel.app/api/admin/products`

## Step 4: Troubleshooting

If you encounter issues:

1. **Build Errors**
   - Check Vercel build logs
   - Ensure all dependencies are in `dependencies` (not `devDependencies`)
   - Clear build cache and redeploy

2. **Database Connection Issues**
   - Verify `MONGODB_URI` is set correctly
   - Check MongoDB Atlas network access settings
   - Ensure IP whitelist includes Vercel's IPs (or set to allow all)

3. **API Errors**
   - Check browser console for errors
   - Verify API routes in `vercel.json`
   - Check CORS settings match your domain

4. **Admin Dashboard Issues**
   - Clear browser cache
   - Check authentication status
   - Verify API base URL configuration

## Step 5: Post-Deployment

1. Test the admin dashboard
2. Create a test product
3. Verify all CRUD operations work
4. Check database connection status

## Need Help?

If you encounter any issues:
1. Check Vercel deployment logs
2. Review MongoDB Atlas logs
3. Run the verification script
4. Check browser console for errors

## Security Notes

1. Never commit sensitive information (like MongoDB URI) to Git
2. Use environment variables for all secrets
3. Regularly rotate database passwords
4. Monitor database access logs 