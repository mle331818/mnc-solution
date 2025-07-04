// Production testing script for MNCC2 admin system
import fetch from 'node-fetch';

const PRODUCTION_URL = 'https://mnc-solution.vercel.app';

async function testProductionAdmin() {
  console.log('🚀 Testing Production Admin System...\n');

  try {
    // Test health endpoint
    console.log('1. Testing /api/admin/health...');
    const healthRes = await fetch(`${PRODUCTION_URL}/api/admin/health`);
    if (healthRes.ok) {
      const healthData = await healthRes.json();
      console.log('✅ Health Status:', healthData);
    } else {
      console.log('❌ Health endpoint failed:', healthRes.status, healthRes.statusText);
    }

    // Test database status
    console.log('\n2. Testing /api/admin/db-status...');
    const dbRes = await fetch(`${PRODUCTION_URL}/api/admin/db-status`);
    if (dbRes.ok) {
      const dbData = await dbRes.json();
      console.log('✅ Database Status:', dbData);
      if (dbData.connected) {
        console.log('🎉 Database is connected!');
      } else {
        console.log('⚠️  Database is not connected. Check MONGODB_URI in Vercel.');
      }
    } else {
      console.log('❌ Database status failed:', dbRes.status, dbRes.statusText);
    }

    // Test products endpoint
    console.log('\n3. Testing /api/admin/products...');
    const productsRes = await fetch(`${PRODUCTION_URL}/api/admin/products`);
    if (productsRes.ok) {
      const productsData = await productsRes.json();
      console.log(`✅ Products found: ${productsData.length}`);
    } else {
      console.log('❌ Products endpoint failed:', productsRes.status, productsRes.statusText);
    }

    // Test admin page accessibility
    console.log('\n4. Testing admin page accessibility...');
    const adminPageRes = await fetch(`${PRODUCTION_URL}/admin`);
    if (adminPageRes.ok) {
      console.log('✅ Admin page is accessible');
    } else {
      console.log('❌ Admin page failed:', adminPageRes.status, adminPageRes.statusText);
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