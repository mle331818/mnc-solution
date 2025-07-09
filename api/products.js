import mongoose from "mongoose";

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || "mongodb+srv://mle331818:fUHKho52UwPsmPwQ@mnc.u1irpbo.mongodb.net/?retryWrites=true&w=majority&appName=mnc";

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  sku: String,
  stock: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Get or create Product model
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Connect to MongoDB if not connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(mongoUri);
    }

    const { method, query, body } = req;

    switch (method) {
      case 'GET':
        if (query.id) {
          // Get single product
          const product = await Product.findById(query.id);
          if (!product) {
            return res.status(404).json({ error: 'Product not found' });
          }
          res.status(200).json(product);
        } else {
          // Get all products with optional category filter
          let filter = {};
          if (query.category) {
            filter.category = { $regex: query.category, $options: 'i' };
          }
          const products = await Product.find(filter).sort({ createdAt: -1 });
          res.status(200).json(products);
        }
        break;

      case 'POST':
        // Create new product
        const newProduct = new Product(body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
        break;

      case 'PUT':
        // Update product
        if (!query.id) {
          return res.status(400).json({ error: 'Product ID required' });
        }
        const updatedProduct = await Product.findByIdAndUpdate(
          query.id,
          { ...body, updatedAt: new Date() },
          { new: true }
        );
        if (!updatedProduct) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
        break;

      case 'DELETE':
        // Delete product
        if (!query.id) {
          return res.status(400).json({ error: 'Product ID required' });
        }
        const deletedProduct = await Product.findByIdAndDelete(query.id);
        if (!deletedProduct) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Products API error:', error);
    res.status(500).json({ 
      error: "Something went wrong!", 
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
} 