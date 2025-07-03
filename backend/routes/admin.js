const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../../public/images/products');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// GET all products (admin view - includes inactive)
router.get('/products', async (req, res) => {
  try {
    const { page = 1, limit = 20, search, category, brand } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    let query = {};
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (category) {
      query.category = category;
    }
    
    if (brand) {
      query.brand = brand;
    }
    
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await Product.countDocuments(query);
    
    res.json({
      products,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        hasNext: skip + products.length < total,
        hasPrev: parseInt(page) > 1,
        totalProducts: total
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// POST create new product
router.post('/products', upload.single('image'), async (req, res) => {
  try {
    const productData = {
      name: req.body.name,
      sku: req.body.sku,
      description: req.body.description,
      price: parseFloat(req.body.price),
      brand: req.body.brand,
      category: req.body.category,
      stock: parseInt(req.body.stock) || 0,
      features: req.body.features ? req.body.features.split(',').map(f => f.trim()) : [],
      isActive: req.body.isActive === 'true'
    };

    // Handle image upload
    if (req.file) {
      productData.image = `/images/products/${req.file.filename}`;
      productData.imageUrl = `/images/products/${req.file.filename}`;
    }

    const product = new Product(productData);
    await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('Error creating product:', error);
    
    // Delete uploaded file if product creation fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Product with this SKU already exists' });
    }
    
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});

// PUT update product
router.put('/products/:id', upload.single('image'), async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = {
      name: req.body.name,
      sku: req.body.sku,
      description: req.body.description,
      price: parseFloat(req.body.price),
      brand: req.body.brand,
      category: req.body.category,
      stock: parseInt(req.body.stock) || 0,
      features: req.body.features ? req.body.features.split(',').map(f => f.trim()) : [],
      isActive: req.body.isActive === 'true'
    };

    // Handle image upload
    if (req.file) {
      updateData.image = `/images/products/${req.file.filename}`;
      updateData.imageUrl = `/images/products/${req.file.filename}`;
      
      // Delete old image if exists
      const oldProduct = await Product.findById(productId);
      if (oldProduct && oldProduct.image && oldProduct.image !== '/images/products/placeholder.svg') {
        const oldImagePath = path.join(__dirname, '../../public', oldProduct.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    
    // Delete uploaded file if update fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Product with this SKU already exists' });
    }
    
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

// DELETE product
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete associated image
    if (product.image && product.image !== '/images/products/placeholder.svg') {
      const imagePath = path.join(__dirname, '../../public', product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

// GET product by ID (admin view)
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

// GET dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ isActive: true });
    const categories = await Product.distinct('category');
    const brands = await Product.distinct('brand');
    
    // Get recent products
    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name sku brand category createdAt');

    res.json({
      stats: {
        totalProducts,
        activeProducts,
        inactiveProducts: totalProducts - activeProducts,
        totalCategories: categories.length,
        totalBrands: brands.length
      },
      recentProducts,
      categories,
      brands
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
  }
});

// GET database status
router.get('/db-status', async (req, res) => {
  try {
    const connected = mongoose.connection.readyState === 1; // 1 = connected
    if (!connected) {
      return res.json({ connected: false });
    }

    // Fetch database stats
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
  } catch (error) {
    console.error('Error fetching DB status:', error);
    res.status(500).json({ connected: false, message: 'Error fetching DB status', error: error.message });
  }
});

module.exports = router; 