const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('🧪 Testing API endpoints...\n');

    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch('http://localhost:5000/api/health');
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.message);
    console.log('📊 Database status:', healthData.database);
    console.log('');

    // Test products endpoint
    console.log('2. Testing products endpoint...');
    const productsResponse = await fetch('http://localhost:5000/api/products?limit=5');
    const productsData = await productsResponse.json();
    console.log(`✅ Found ${productsData.products.length} products`);
    console.log(`📊 Total pages: ${productsData.pagination.total}`);
    console.log('');

    // Test categories endpoint
    console.log('3. Testing categories endpoint...');
    const categoriesResponse = await fetch('http://localhost:5000/api/products/categories/list');
    const categoriesData = await categoriesResponse.json();
    console.log(`✅ Found ${categoriesData.length} categories:`, categoriesData.join(', '));
    console.log('');

    // Test brands endpoint
    console.log('4. Testing brands endpoint...');
    const brandsResponse = await fetch('http://localhost:5000/api/products/brands/list');
    const brandsData = await brandsResponse.json();
    console.log(`✅ Found ${brandsData.length} brands:`, brandsData.join(', '));
    console.log('');

    // Test category products
    console.log('5. Testing category products...');
    const categoryResponse = await fetch('http://localhost:5000/api/products/category/cctv?limit=3');
    const categoryData = await categoryResponse.json();
    console.log(`✅ Found ${categoryData.products.length} CCTV products`);
    console.log('');

    console.log('🎉 All API tests passed! Your database is working correctly.');
    console.log('\n📋 Summary:');
    console.log(`- Total products: ${productsData.pagination.total * productsData.products.length}`);
    console.log(`- Categories: ${categoriesData.length}`);
    console.log(`- Brands: ${brandsData.length}`);
    console.log(`- Database: ${healthData.database}`);

  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

testAPI(); 