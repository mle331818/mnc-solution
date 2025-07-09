# MNCC2 Backend API

This is the backend API for the MNCC2 admin portal, built with Node.js, Express, and MongoDB Atlas.

## Features

- ✅ MongoDB Atlas integration
- ✅ Product CRUD operations
- ✅ Image upload functionality
- ✅ Search and filtering
- ✅ Admin dashboard with statistics
- ✅ RESTful API endpoints

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

Create a `.env` file in the backend directory:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://mle331818:fUHKho52UwPsmPwQ@mnc.u1irpbo.mongodb.net/?retryWrites=true&w=majority&appName=mnc

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (for admin authentication)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### 3. Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

### 4. Test the API

Visit `http://localhost:5000/api/health` to check if the server is running.

## API Endpoints

### Public Endpoints

- `GET /api/health` - Health check
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/sku/:sku` - Get product by SKU
- `GET /api/products/categories/list` - Get all categories
- `GET /api/products/brands/list` - Get all brands
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/brand/:brand` - Get products by brand

### Admin Endpoints

- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/products` - Get all products (admin view)
- `POST /api/admin/products` - Create new product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/products/:id` - Get product by ID (admin view)

## Database Migration

To migrate your existing product data to MongoDB:

```bash
node scripts/migrateData.js
```

## File Structure

```
backend/
├── models/
│   └── Product.js          # Product schema
├── routes/
│   ├── products.js         # Public product routes
│   └── admin.js           # Admin routes
├── scripts/
│   └── migrateData.js     # Data migration script
├── server.js              # Main server file
├── package.json           # Dependencies
└── README.md             # This file
```

## Image Upload

- Images are stored in `/public/images/products/`
- Supported formats: JPG, PNG, GIF
- Maximum file size: 5MB
- Automatic filename generation with timestamps

## Next Steps

1. **Frontend Integration**: Update your React app to fetch data from these API endpoints
2. **Admin Portal**: Create the admin interface using these API endpoints
3. **Authentication**: Add JWT authentication for admin access
4. **Validation**: Add input validation and error handling

## Troubleshooting

### MongoDB Connection Issues
- Check your MongoDB Atlas connection string
- Ensure your IP is whitelisted in Atlas
- Verify database user credentials

### Image Upload Issues
- Check file permissions in `/public/images/products/`
- Ensure file size is under 5MB
- Verify file format is supported

### CORS Issues
- Update `CORS_ORIGIN` in `.env` to match your frontend URL
- Ensure the frontend is running on the correct port 