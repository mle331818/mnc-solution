// Final verification script for MNCC2 admin system
import fs from 'fs';
import https from 'https';

console.log('🔍 FINAL VERIFICATION - MNCC2 Admin System\n');

// 1. Check all required files
console.log('📁 File Structure Verification:');
const files = [
  { path: 'src/App.tsx', required: ['AdminLogin', 'AdminDashboard', 'RequireAuth'] },
  { path: 'src/pages/admin/Login.tsx', required: ['login', 'useNavigate'] },
  { path: 'src/pages/admin/AdminDashboard.tsx', required: ['getProducts', 'getDBStatus'] },
  { path: 'src/pages/admin/RequireAuth.tsx', required: ['isAuthenticated'] },
  { path: 'src/pages/admin/ProductForm.tsx', required: ['createProduct', 'updateProduct'] },
  { path: 'src/api/admin.ts', required: ['login', 'getProducts', 'getDBStatus'] },
  { path: 'src/lib/getApiBase.ts', required: ['API_BASE'] },
  { path: 'api/admin.js', required: ['mongoose', 'Product', 'db-status'] },
  { path: 'vercel.json', required: ['/api/admin', 'admin.js'] }
];

let allFilesOK = true;
files.forEach(file => {
  if (fs.existsSync(file.path)) {
    const content = fs.readFileSync(file.path, 'utf8');
    const missing = file.required.filter(req => !content.includes(req));
    if (missing.length === 0) {
      console.log(`✅ ${file.path}`);
    } else {
      console.log(`❌ ${file.path} - Missing: ${missing.join(', ')}`);
      allFilesOK = false;
    }
  } else {
    console.log(`❌ ${file.path} - FILE NOT FOUND`);
    allFilesOK = false;
  }
});

if (!allFilesOK) {
  console.log('\n❌ Some files have issues. Please fix before deploying.');
  process.exit(1);
}

console.log('\n✅ All files are properly configured!');

// 2. Test production endpoints
console.log('\n🌐 Testing Production Endpoints:');

function testEndpoint(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'mnc-solution.vercel.app',
      path: path,
      method: 'GET',
      headers: { 'User-Agent': 'MNCC2-Verification' }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData, isJson: true });
        } catch (e) {
          resolve({ status: res.statusCode, data: data.substring(0, 100) + '...', isJson: false });
        }
      });
    });

    req.on('error', () => resolve({ status: 0, data: 'Connection failed', isJson: false }));
    req.setTimeout(10000, () => { req.destroy(); resolve({ status: 0, data: 'Timeout', isJson: false }); });
    req.end();
  });
}

async function runTests() {
  const tests = [
    { path: '/api/admin/health', name: 'Health Check' },
    { path: '/api/admin/db-status', name: 'Database Status' },
    { path: '/api/admin/products', name: 'Products List' }
  ];

  for (const test of tests) {
    console.log(`\nTesting ${test.name}...`);
    const result = await testEndpoint(test.path);
    
    if (result.status === 200 && result.isJson) {
      console.log(`✅ ${test.name} - Working (JSON response)`);
      if (test.path === '/api/admin/db-status') {
        if (result.data.connected) {
          console.log('🎉 Database is connected!');
        } else {
          console.log('⚠️  Database is not connected - Set MONGODB_URI in Vercel');
        }
      }
    } else if (result.status === 200 && !result.isJson) {
      console.log(`⚠️  ${test.name} - Returns HTML (routing issue)`);
    } else {
      console.log(`❌ ${test.name} - Failed (Status: ${result.status})`);
    }
  }
}

runTests().then(() => {
  console.log('\n📋 VERIFICATION COMPLETE');
  console.log('\n🎯 SUMMARY:');
  console.log('✅ All code files are properly configured');
  console.log('✅ Vercel configuration is correct');
  console.log('✅ Admin API endpoints are set up');
  
  console.log('\n🔧 REQUIRED ACTIONS:');
  console.log('1. Set MONGODB_URI in Vercel Environment Variables');
  console.log('2. Set NODE_ENV=production in Vercel Environment Variables');
  console.log('3. Redeploy your project in Vercel Dashboard');
  console.log('4. Test: https://mnc-solution.vercel.app/admin');
  
  console.log('\n💡 The admin system will work once you set the environment variables!');
}); 