// Simple test script for MNCC2 admin system
import https from 'https';
import http from 'http';

const PRODUCTION_URL = 'mnc-solution.vercel.app';

function makeRequest(hostname, path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname,
      path,
      method: 'GET',
      headers: {
        'User-Agent': 'MNCC2-Test-Script'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(10000, () => req.destroy());
    req.end();
  });
}

async function testProductionAdmin() {
  console.log('🚀 Testing Production Admin System...\n');

  try {
    // Test health endpoint
    console.log('1. Testing /api/admin/health...');
    const healthResult = await makeRequest(PRODUCTION_URL, '/api/admin/health');
    if (healthResult.status === 200) {
      console.log('✅ Health Status:', healthResult.data);
    } else {
      console.log('❌ Health endpoint failed:', healthResult.status);
    }

    // Test database status
    console.log('\n2. Testing /api/admin/db-status...');
    const dbResult = await makeRequest(PRODUCTION_URL, '/api/admin/db-status');
    if (dbResult.status === 200) {
      console.log('✅ Database Status:', dbResult.data);
      if (dbResult.data.connected) {
        console.log('🎉 Database is connected!');
      } else {
        console.log('⚠️  Database is not connected. Check MONGODB_URI in Vercel.');
      }
    } else {
      console.log('❌ Database status failed:', dbResult.status);
    }

    // Test products endpoint
    console.log('\n3. Testing /api/admin/products...');
    const productsResult = await makeRequest(PRODUCTION_URL, '/api/admin/products');
    if (productsResult.status === 200) {
      console.log(`✅ Products found: ${Array.isArray(productsResult.data) ? productsResult.data.length : 'N/A'}`);
    } else {
      console.log('❌ Products endpoint failed:', productsResult.status);
    }

    console.log('\n📋 Production Test Summary:');
    console.log('✅ All endpoints tested');
    console.log('🌐 Admin Dashboard: https://mnc-solution.vercel.app/admin');
    console.log('🔑 Login Credentials: admin / admin123');

  } catch (error) {
    console.log('❌ Error:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Check if the site is deployed: https://mnc-solution.vercel.app');
    console.log('2. Verify environment variables in Vercel');
    console.log('3. Check Vercel function logs for errors');
  }
}

testProductionAdmin(); 