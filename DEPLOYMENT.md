# 🚀 Deployment Guide: MongoDB + Vercel Integration

This guide will help you deploy your website with MongoDB integration on Vercel for real-time product management.

## 📋 Prerequisites

- MongoDB Atlas account (you already have this)
- Vercel account
- GitHub repository connected to Vercel

## 🔧 Step 1: Backend Deployment (Vercel)

### 1.1 Deploy Backend to Vercel

1. **Push your code to GitHub** (if not already done)
2. **Go to Vercel Dashboard** → New Project
3. **Import your GitHub repository**
4. **Configure the project:**
   - Framework Preset: `Node.js`
   - Root Directory: `./` (root of your project)
   - Build Command: Leave empty (we'll use serverless functions)
   - Output Directory: Leave empty
   - Install Command: `npm install`

### 1.2 Set Environment Variables

In your Vercel project settings, add these environment variables:

```bash
MONGODB_URI=mongodb+srv://mle331818:fUHKho52UwPsmPwQ@mnc.u1irpbo.mongodb.net/?retryWrites=true&w=majority&appName=mnc
NODE_ENV=production
```

### 1.3 Update CORS Settings

After deployment, update the CORS origins in `server/index.js`:

```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.vercel.app', 'https://your-frontend-domain.com']
    : ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:8081'],
  credentials: true
}));
```

Replace `your-frontend-domain.vercel.app` with your actual frontend domain.

## 🔧 Step 2: Frontend Deployment (Vercel)

### 2.1 Update API Configuration

Update `src/api.ts` with your backend URL:

```typescript
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  if (import.meta.env.PROD) {
    return "https://your-backend-domain.vercel.app/api"; // Replace with your backend URL
  }
  return "http://localhost:4000/api";
};
```

### 2.2 Deploy Frontend

1. **Create a new Vercel project** for your frontend
2. **Import the same GitHub repository**
3. **Configure:**
   - Framework Preset: `Vite`
   - Root Directory: `./` (root of your project)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 2.3 Set Frontend Environment Variables

In your frontend Vercel project settings:

```bash
VITE_API_BASE_URL=https://your-backend-domain.vercel.app/api
VITE_NODE_ENV=production
```

## 🔧 Step 3: Database Setup

### 3.1 MongoDB Atlas Configuration

Your MongoDB Atlas is already configured. Ensure:

1. **Network Access**: Allow connections from anywhere (0.0.0.0/0)
2. **Database Access**: Your user has read/write permissions
3. **Collections**: Products will be created automatically

### 3.2 Initial Data (Optional)

You can add initial products through the admin panel or directly in MongoDB:

```javascript
// Example product structure
{
  "name": "Dahua HD Camera",
  "description": "High-definition security camera",
  "category": "cctv",
  "price": 299.99,
  "stock": 50,
  "status": "active",
  "image": "data:image/jpeg;base64,...",
  "sku": "DAH-HD-001"
}
```

## 🔧 Step 4: Testing the Integration

### 4.1 Test API Endpoints

Visit your backend URL to test:

- `https://your-backend-domain.vercel.app/api/health` - Health check
- `https://your-backend-domain.vercel.app/api/products` - Get all products

### 4.2 Test Admin Panel

1. Go to your frontend URL
2. Navigate to `/admin`
3. Try adding, editing, and deleting products
4. Verify changes appear on the public site immediately

## 🔧 Step 5: Real-time Updates

### 5.1 How It Works

- **React Query** handles caching and automatic refetching
- **Cache invalidation** triggers when products are modified
- **Window focus** triggers refetch when user returns to tab
- **30-second stale time** ensures fresh data

### 5.2 Monitoring

Check Vercel function logs for any errors:
- Vercel Dashboard → Your Project → Functions → View Logs

## 🔧 Step 6: Production Optimization

### 6.1 Performance

- Images are stored as base64 in MongoDB (consider using CDN for production)
- React Query provides efficient caching
- Vercel edge functions for fast global delivery

### 6.2 Security

- CORS is configured for your domains only
- Environment variables are encrypted
- MongoDB connection uses SSL

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**: Check CORS origins in backend
2. **MongoDB Connection**: Verify MONGODB_URI environment variable
3. **API 404**: Check Vercel function deployment
4. **Images Not Loading**: Check base64 encoding

### Debug Commands

```bash
# Test backend locally
npm start --prefix server

# Test frontend locally
npm run dev

# Check API health
curl https://your-backend-domain.vercel.app/api/health
```

## 📞 Support

If you encounter issues:

1. Check Vercel function logs
2. Verify environment variables
3. Test API endpoints directly
4. Check MongoDB Atlas connection

## 🎉 Success!

Once deployed, your website will:

✅ **Store all products in MongoDB**  
✅ **Update in real-time** when admin makes changes  
✅ **No redeployment needed** for content updates  
✅ **Fast global delivery** via Vercel  
✅ **Automatic scaling** for traffic spikes  

Your admin can now manage products through the admin panel, and changes will appear instantly on the public website! 