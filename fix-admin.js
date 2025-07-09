// Comprehensive fix script for MNCC2 admin system
import fs from 'fs';
import https from 'https';

console.log('🔧 MNCC2 Admin System Fix Script\n');

// Check if all required files exist
const requiredFiles = [
  'src/App.tsx',
  'src/pages/admin/Login.tsx',
  'src/pages/admin/AdminDashboard.tsx',
  'src/pages/admin/RequireAuth.tsx',
  'src/pages/admin/ProductForm.tsx',
  'src/api/admin.ts',
  'src/lib/getApiBase.ts',
  'api/admin.js',
  'vercel.json'
];

console.log('📁 Checking required files...');
let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log('\n❌ Some required files are missing. Please check the deployment.');
  process.exit(1);
}

console.log('\n✅ All required files are present!');

// Test production endpoints
function testEndpoint(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'mnc-solution.vercel.app',
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'MNCC2-Fix-Script'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData, isJson: true });
        } catch (e) {
          resolve({ status: res.statusCode, data: data, isJson: false });
        }
      });
    });

    req.on('error', () => {
      resolve({ status: 0, data: 'Connection failed', isJson: false });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({ status: 0, data: 'Timeout', isJson: false });
    });

    req.end();
  });
}

async function testProductionEndpoints() {
  console.log('\n🌐 Testing production endpoints...');

  const endpoints = [
    { path: '/api/admin/health', name: 'Health Check' },
    { path: '/api/admin/db-status', name: 'Database Status' },
    { path: '/api/admin/products', name: 'Products List' }
  ];

  for (const endpoint of endpoints) {
    console.log(`\nTesting ${endpoint.name}...`);
    const result = await testEndpoint(endpoint.path);
    
    if (result.status === 200 && result.isJson) {
      console.log(`✅ ${endpoint.name} - Working`);
      if (endpoint.path === '/api/admin/db-status' && result.data.connected) {
        console.log('🎉 Database is connected!');
      }
    } else if (result.status === 200 && !result.isJson) {
      console.log(`⚠️  ${endpoint.name} - Returns HTML (routing issue)`);
    } else {
      console.log(`❌ ${endpoint.name} - Failed (${result.status})`);
    }
  }
}

testProductionEndpoints().then(() => {
  console.log('\n📋 DIAGNOSIS COMPLETE');
  console.log('\n🔧 NEXT STEPS TO FIX:');
  console.log('1. Go to Vercel Dashboard → Project Settings → Environment Variables');
  console.log('2. Add MONGODB_URI with your MongoDB Atlas connection string');
  console.log('3. Add NODE_ENV=production');
  console.log('4. Redeploy your project');
  console.log('5. Test again: https://mnc-solution.vercel.app/admin');
  
  console.log('\n💡 If endpoints return HTML, the routing is broken.');
  console.log('💡 If endpoints return JSON but db-status shows disconnected, set MONGODB_URI.');
  console.log('💡 If everything works, your admin dashboard will be online!');
}); 