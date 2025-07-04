import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// Enhanced error logging
const logError = (error, context) => {
  console.error(`[${new Date().toISOString()}] Error in ${context}:`, {
    message: error.message,
    stack: error.stack,
    code: error.code
  });
};

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.VERCEL_URL || 'https://mnc-solution.vercel.app', 'https://mnc-solution-iqxn0z1yz-mario-elias-projects.vercel.app']
    : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:8080'],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection with retry logic
const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  try {
    if (mongoose.connection.readyState === 1) {
      console.log('Using existing MongoDB connection');
      return;
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    logError(error, 'MongoDB Connection');
    throw error;
  }
};

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// Enhanced error handler middleware
const errorHandler = (err, req, res, next) => {
  logError(err, `${req.method} ${req.path}`);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    path: req.path,
    timestamp: new Date().toISOString()
  });
};

// API wrapper for consistent error handling
const apiHandler = (handler) => async (req, res, next) => {
  try {
    await connectDB();
    await handler(req, res);
  } catch (error) {
    next(error);
  }
};

// GET database status with detailed info
app.get('/api/admin/db-status', apiHandler(async (req, res) => {
  const connected = mongoose.connection.readyState === 1;
  const status = {
    connected,
    environment: process.env.NODE_ENV || 'development',
    vercelEnv: process.env.VERCEL_ENV,
    timestamp: new Date().toISOString(),
    mongodbVersion: mongoose.version,
    readyState: mongoose.connection.readyState
  };

  if (!connected) {
    return res.json({ ...status, message: "Database not connected" });
  }

  const stats = await mongoose.connection.db.stats();
  res.json({
    ...status,
    dbName: mongoose.connection.name,
    host: mongoose.connection.host,
    storageSizeMB: (stats.storageSize / (1024 * 1024)).toFixed(2),
    dataSizeMB: (stats.dataSize / (1024 * 1024)).toFixed(2),
  });
}));

// GET all products with pagination
app.get('/api/admin/products', apiHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Product.countDocuments()
  ]);

  res.json({
    products,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
}));

// POST create new product with validation
app.post('/api/admin/products', apiHandler(async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json({
    message: 'Product created successfully',
    product
  });
}));

// PUT update product with validation
app.put('/api/admin/products/:id', apiHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedAt: Date.now() },
    { new: true, runValidators: true }
  );

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json({
    message: 'Product updated successfully',
    product
  });
}));

// DELETE product with confirmation
app.delete('/api/admin/products/:id', apiHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json({
    message: 'Product deleted successfully',
    productId: req.params.id
  });
}));

// Health check with detailed info
app.get('/api/admin/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    vercelEnv: process.env.VERCEL_ENV || 'unknown',
    nodeVersion: process.version,
    memoryUsage: process.memoryUsage(),
    uptime: process.uptime()
  });
});

// Add error handler middleware
app.use(errorHandler);

// Export the Express app
export default app; 