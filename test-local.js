// Local testing script for MNCC2 admin system
import fetch from 'node-fetch';

const API_BASE = 'http://localhost:5000';

async function testLocalAdmin() {
  console.log('🧪 Testing Local Admin System...\n');

  try {
    // Test health endpoint
    console.log('1. Testing /api/admin/health...');
    const healthRes = await fetch(`${API_BASE}/api/admin/health`);
    if (healthRes.ok) {
      const healthData = await healthRes.json();
      console.log('✅ Health Status:', healthData);
    } else {
      console.log('❌ Health endpoint failed:', healthRes.status);
    }

    // Test database status
    console.log('\n2. Testing /api/admin/db-status...');
    const dbRes = await fetch(`${API_BASE}/api/admin/db-status`);
    if (dbRes.ok) {
      const dbData = await dbRes.json();
      console.log('✅ Database Status:', dbData);
    } else {
      console.log('❌ Database status failed:', dbRes.status);
    }

    // Test products endpoint
    console.log('\n3. Testing /api/admin/products...');
    const productsRes = await fetch(`${API_BASE}/api/admin/products`);
    if (productsRes.ok) {
      const productsData = await productsRes.json();
      console.log(`✅ Products found: ${productsData.length}`);
    } else {
      console.log('❌ Products endpoint failed:', productsRes.status);
    }

  } catch (error) {
    console.log('❌ Error:', error.message);
    console.log('\n💡 To run local tests:');
    console.log('1. Start the backend: cd backend && npm run dev');
    console.log('2. Start the frontend: npm run dev');
    console.log('3. Visit http://localhost:5173/admin');
  }
}

testLocalAdmin(); 