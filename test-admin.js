// Test script for admin API endpoints
const API_BASE = process.env.VITE_API_BASE || 'http://localhost:5000';

async function testAdminEndpoints() {
  console.log('Testing Admin API Endpoints...\n');

  try {
    // Test health endpoint
    console.log('1. Testing /api/admin/health...');
    const healthRes = await fetch(`${API_BASE}/api/admin/health`);
    const healthData = await healthRes.json();
    console.log('Health Status:', healthData);
    console.log('✅ Health endpoint working\n');

    // Test database status
    console.log('2. Testing /api/admin/db-status...');
    const dbRes = await fetch(`${API_BASE}/api/admin/db-status`);
    const dbData = await dbRes.json();
    console.log('Database Status:', dbData);
    console.log('✅ Database status endpoint working\n');

    // Test products endpoint
    console.log('3. Testing /api/admin/products...');
    const productsRes = await fetch(`${API_BASE}/api/admin/products`);
    const productsData = await productsRes.json();
    console.log(`Products found: ${productsData.length}`);
    console.log('✅ Products endpoint working\n');

    console.log('🎉 All admin endpoints are working correctly!');
    
  } catch (error) {
    console.error('❌ Error testing admin endpoints:', error.message);
  }
}

// Run the test
testAdminEndpoints(); 