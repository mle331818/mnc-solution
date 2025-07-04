import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.VERCEL_URL || 'https://mnc-solution.vercel.app']
    : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:8080'],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("MONGODB_URI environment variable is not set!");
}

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    const db = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
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

// Wrapper for API handlers
const apiHandler = (handler) => async (req, res) => {
  try {
    await connectDB();
    await handler(req, res);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET database status
app.get('/api/admin/db-status', apiHandler(async (req, res) => {
  const connected = mongoose.connection.readyState === 1;
  if (!connected) {
    return res.json({ connected: false, message: "Database not connected" });
  }

  const stats = await mongoose.connection.db.stats();
  const storageSizeMB = (stats.storageSize || 0) / (1024 * 1024);
  const dataSizeMB = (stats.dataSize || 0) / (1024 * 1024);

  res.json({
    connected: true,
    dbName: mongoose.connection.name,
    host: mongoose.connection.host,
    storageSizeMB: storageSizeMB.toFixed(2),
    dataSizeMB: dataSizeMB.toFixed(2),
  });
}));

// GET all products (admin view)
app.get('/api/admin/products', apiHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
}));

// POST create new product
app.post('/api/admin/products', apiHandler(async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
}));

// PUT update product
app.put('/api/admin/products/:id', apiHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedAt: Date.now() },
    { new: true }
  );
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
}));

// DELETE product
app.delete('/api/admin/products/:id', apiHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json({ message: 'Product deleted successfully' });
}));

// Health check
app.get('/api/admin/health', apiHandler(async (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV || 'development',
    vercelEnv: process.env.VERCEL_ENV || 'unknown'
  });
}));

// Vercel serverless function handler
export default app; 