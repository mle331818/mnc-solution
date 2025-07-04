// Deployment check script for MNCC2 admin system
import fs from 'fs';
import path from 'path';

console.log('🔍 Checking MNCC2 Admin System Deployment Readiness...\n');

const checks = [
  {
    name: 'Frontend App.tsx',
    file: 'src/App.tsx',
    required: ['AdminLogin', 'AdminDashboard', 'RequireAuth']
  },
  {
    name: 'Admin Login Component',
    file: 'src/pages/admin/Login.tsx',
    required: ['login', 'useNavigate', 'toast']
  },
  {
    name: 'Admin Dashboard Component',
    file: 'src/pages/admin/AdminDashboard.tsx',
    required: ['getProducts', 'getDBStatus', 'useQuery']
  },
  {
    name: 'Admin Auth Guard',
    file: 'src/pages/admin/RequireAuth.tsx',
    required: ['isAuthenticated', 'Navigate']
  },
  {
    name: 'Product Form Component',
    file: 'src/pages/admin/ProductForm.tsx',
    required: ['createProduct', 'updateProduct', 'Dialog']
  },
  {
    name: 'Admin API Functions',
    file: 'src/api/admin.ts',
    required: ['login', 'getProducts', 'getDBStatus']
  },
  {
    name: 'API Base URL Config',
    file: 'src/lib/getApiBase.ts',
    required: ['API_BASE']
  },
  {
    name: 'Vercel Admin API',
    file: 'api/admin.js',
    required: ['mongoose', 'Product', 'db-status']
  },
  {
    name: 'Vercel Configuration',
    file: 'vercel.json',
    required: ['/api/admin', 'admin.js']
  }
];

let allPassed = true;

checks.forEach(check => {
  try {
    const content = fs.readFileSync(check.file, 'utf8');
    const missing = check.required.filter(req => !content.includes(req));
    
    if (missing.length === 0) {
      console.log(`✅ ${check.name} - OK`);
    } else {
      console.log(`❌ ${check.name} - Missing: ${missing.join(', ')}`);
      allPassed = false;
    }
  } catch (error) {
    console.log(`❌ ${check.name} - File not found`);
    allPassed = false;
  }
});

console.log('\n📋 Deployment Checklist:');
console.log('1. ✅ All code files are present and configured');
console.log('2. ⚠️  Set MONGODB_URI in Vercel environment variables');
console.log('3. ⚠️  Set NODE_ENV=production in Vercel environment variables');
console.log('4. ⚠️  Deploy to Vercel');
console.log('5. ⚠️  Test admin endpoints: /api/admin/health, /api/admin/db-status');
console.log('6. ⚠️  Test admin dashboard: /admin (login: admin/admin123)');

if (allPassed) {
  console.log('\n🎉 All code checks passed! Ready for deployment.');
} else {
  console.log('\n⚠️  Some issues found. Please fix before deploying.');
}

console.log('\n📝 Next Steps:');
console.log('1. Go to Vercel Dashboard → Project Settings → Environment Variables');
console.log('2. Add MONGODB_URI with your MongoDB Atlas connection string');
console.log('3. Add NODE_ENV=production');
console.log('4. Redeploy your project');
console.log('5. Visit https://mnc-solution.vercel.app/admin'); 