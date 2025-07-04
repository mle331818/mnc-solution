import fetch from 'node-fetch';

const BASE_URL = process.env.VERCEL_URL || 'http://localhost:8080';

async function checkEndpoint(url, method = 'GET', body = null) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();
    
    return {
      status: response.status,
      ok: response.ok,
      data
    };
  } catch (error) {
    return {
      status: 'error',
      error: error.message
    };
  }
}

async function verifyDeployment() {
  console.log('🔍 Starting deployment verification...\n');

  // Check health endpoint
  console.log('1️⃣ Checking health endpoint...');
  const health = await checkEndpoint(`${BASE_URL}/api/admin/health`);
  console.log('Health status:', health.ok ? '✅' : '❌');
  console.log('Response:', health.data);
  console.log('\n---\n');

  // Check database connection
  console.log('2️⃣ Checking database connection...');
  const dbStatus = await checkEndpoint(`${BASE_URL}/api/admin/db-status`);
  console.log('Database connection:', dbStatus.data?.connected ? '✅' : '❌');
  console.log('Response:', dbStatus.data);
  console.log('\n---\n');

  // Check products endpoint
  console.log('3️⃣ Checking products endpoint...');
  const products = await checkEndpoint(`${BASE_URL}/api/admin/products`);
  console.log('Products endpoint:', products.ok ? '✅' : '❌');
  console.log('Number of products:', Array.isArray(products.data) ? products.data.length : 'N/A');
  console.log('\n---\n');

  // Create test product
  console.log('4️⃣ Testing product creation...');
  const newProduct = {
    name: 'Test Product',
    description: 'Test Description',
    price: 99.99,
    category: 'Test Category',
    brand: 'Test Brand',
    sku: `TEST-${Date.now()}`,
    image: 'https://example.com/test.jpg',
    stock: 10
  };

  const createdProduct = await checkEndpoint(
    `${BASE_URL}/api/admin/products`,
    'POST',
    newProduct
  );
  console.log('Product creation:', createdProduct.ok ? '✅' : '❌');
  
  if (createdProduct.ok) {
    // Update product
    console.log('\n5️⃣ Testing product update...');
    const updateResult = await checkEndpoint(
      `${BASE_URL}/api/admin/products/${createdProduct.data._id}`,
      'PUT',
      { ...newProduct, name: 'Updated Test Product' }
    );
    console.log('Product update:', updateResult.ok ? '✅' : '❌');

    // Delete product
    console.log('\n6️⃣ Testing product deletion...');
    const deleteResult = await checkEndpoint(
      `${BASE_URL}/api/admin/products/${createdProduct.data._id}`,
      'DELETE'
    );
    console.log('Product deletion:', deleteResult.ok ? '✅' : '❌');
  }

  console.log('\n🏁 Verification complete!\n');
}

verifyDeployment().catch(console.error); 