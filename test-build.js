// Test build script for MNCC2
import { execSync } from 'child_process';
import fs from 'fs';

console.log('🔨 Testing MNCC2 Build Process...\n');

try {
  // Check if package.json has the right dependencies
  console.log('📦 Checking package.json...');
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  const requiredDeps = ['vite', '@vitejs/plugin-react-swc', 'typescript', 'tailwindcss'];
  const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);
  
  if (missingDeps.length > 0) {
    console.log(`❌ Missing dependencies: ${missingDeps.join(', ')}`);
    process.exit(1);
  }
  
  console.log('✅ All required dependencies are in dependencies (not devDependencies)');
  
  // Test if vite is available
  console.log('\n🔧 Testing Vite availability...');
  try {
    execSync('npx vite --version', { stdio: 'pipe' });
    console.log('✅ Vite is available');
  } catch (error) {
    console.log('❌ Vite is not available');
    process.exit(1);
  }
  
  // Test build command
  console.log('\n🏗️  Testing build command...');
  try {
    execSync('npm run build', { stdio: 'pipe' });
    console.log('✅ Build completed successfully');
    
    // Check if dist folder exists
    if (fs.existsSync('dist')) {
      console.log('✅ Dist folder created');
    } else {
      console.log('❌ Dist folder not found');
    }
  } catch (error) {
    console.log('❌ Build failed:', error.message);
    process.exit(1);
  }
  
  console.log('\n🎉 Build test completed successfully!');
  console.log('✅ Ready for Vercel deployment');
  
} catch (error) {
  console.log('❌ Error:', error.message);
  process.exit(1);
} 