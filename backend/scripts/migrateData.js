const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

// Sample product data to migrate (you can replace this with your actual data)
const sampleProducts = [
  {
    name: "Dahua HDW1230T1-S5",
    sku: "HDW1230T1-S5",
    description: "5MP Dome Camera with IR Night Vision",
    price: 299.99,
    brand: "Dahua",
    category: "CCTV",
    image: "/images/products/dahua hdw1230t1-s5.png",
    stock: 10,
    isActive: true,
    features: ["5MP Resolution", "IR Night Vision", "IP67 Weatherproof", "Motion Detection"]
  },
  {
    name: "Dahua HFW1431S1-A-S4",
    sku: "HFW1431S1-A-S4",
    description: "4MP Bullet Camera with Advanced Analytics",
    price: 249.99,
    brand: "Dahua",
    category: "CCTV",
    image: "/images/products/dahua HFW1431S1-A-S4.png",
    stock: 15,
    isActive: true,
    features: ["4MP Resolution", "Advanced Analytics", "IP67 Weatherproof", "Smart Motion Detection"]
  },
  {
    name: "Dahua HDW1509TLQP",
    sku: "HDW1509TLQP",
    description: "5MP Dome Camera with Audio",
    price: 199.99,
    brand: "Dahua",
    category: "CCTV",
    image: "/images/products/dahua hdw1509tlqp.png",
    stock: 8,
    isActive: true,
    features: ["5MP Resolution", "Built-in Audio", "IR Night Vision", "IP67 Weatherproof"]
  }
];

async function migrateData() {
  try {
    // Connect to MongoDB Atlas
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://mle331818:fUHKho52UwPsmPwQ@mnc.u1irpbo.mongodb.net/?retryWrites=true&w=majority&appName=mnc';
    
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB Atlas');
    
    // Clear existing products (optional - remove this if you want to keep existing data)
    // await Product.deleteMany({});
    // console.log('🗑️ Cleared existing products');
    
    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully migrated ${insertedProducts.length} products`);
    
    // Display migrated products
    console.log('\n📋 Migrated Products:');
    insertedProducts.forEach(product => {
      console.log(`- ${product.name} (SKU: ${product.sku}) - $${product.price}`);
    });
    
    // Get database stats
    const totalProducts = await Product.countDocuments();
    const categories = await Product.distinct('category');
    const brands = await Product.distinct('brand');
    
    console.log('\n📊 Database Stats:');
    console.log(`Total Products: ${totalProducts}`);
    console.log(`Categories: ${categories.join(', ')}`);
    console.log(`Brands: ${brands.join(', ')}`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateData();
}

module.exports = migrateData; 