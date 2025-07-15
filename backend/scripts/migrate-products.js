const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Import the Product model
const Product = require('../models/Product');

// MongoDB Atlas Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://mle331818:fUHKho52UwPsmPwQ@mnc.u1irpbo.mongodb.net/?retryWrites=true&w=majority&appName=mnc';

// Function to read and parse the JSON file
function loadProductsFromJson() {
  try {
    const jsonPath = path.join(__dirname, '../../src/data/products.json');
    const jsonData = fs.readFileSync(jsonPath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    throw error;
  }
}

// Function to transform JSON products to database format
function transformProduct(jsonProduct, category) {
  return {
    name: jsonProduct.name,
    sku: jsonProduct.sku || `SKU-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    description: jsonProduct.description || '',
    price: typeof jsonProduct.price === 'string' ? parseFloat(jsonProduct.price.replace(/[$,]/g, '')) : jsonProduct.price,
    salePrice: jsonProduct.salePrice ? (typeof jsonProduct.salePrice === 'string' ? parseFloat(jsonProduct.salePrice.replace(/[$,]/g, '')) : jsonProduct.salePrice) : null,
    brand: jsonProduct.brand || 'Unknown',
    category: category,
    image: jsonProduct.image || '/images/products/placeholder.svg',
    stock: jsonProduct.stock || 0,
    barcode: jsonProduct.barcode || '',
    features: jsonProduct.features || [],
    isActive: true
  };
}

// Main migration function
async function migrateProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB Atlas successfully!');

    // Load products from JSON
    const jsonData = loadProductsFromJson();
    console.log('📦 Loaded products from JSON file');

    let totalProducts = 0;
    let migratedProducts = 0;
    let skippedProducts = 0;

    // Process each category
    for (const [categoryKey, categoryData] of Object.entries(jsonData.categories)) {
      console.log(`\n🔄 Processing category: ${categoryData.title}`);
      
      for (const product of categoryData.products) {
        totalProducts++;
        
        try {
          // Check if product already exists by SKU
          const existingProduct = await Product.findOne({ sku: product.sku });
          
          if (existingProduct) {
            console.log(`⏭️  Skipping existing product: ${product.name} (SKU: ${product.sku})`);
            skippedProducts++;
            continue;
          }

          // Transform and save product
          const transformedProduct = transformProduct(product, categoryKey);
          const newProduct = new Product(transformedProduct);
          await newProduct.save();
          
          console.log(`✅ Migrated: ${product.name} (SKU: ${product.sku})`);
          migratedProducts++;
          
        } catch (error) {
          console.error(`❌ Error migrating product ${product.name}:`, error.message);
        }
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`Total products in JSON: ${totalProducts}`);
    console.log(`Successfully migrated: ${migratedProducts}`);
    console.log(`Skipped (already exists): ${skippedProducts}`);
    console.log(`Failed: ${totalProducts - migratedProducts - skippedProducts}`);

    // Get total products in database
    const totalInDB = await Product.countDocuments();
    console.log(`Total products in database: ${totalInDB}`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  console.log('🚀 Starting product migration...');
  migrateProducts()
    .then(() => {
      console.log('✅ Migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Migration failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateProducts }; 