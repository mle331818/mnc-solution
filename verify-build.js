import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function checkDependencies() {
  console.log('📦 Checking dependencies...');
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  const requiredDeps = ['vite', '@vitejs/plugin-react-swc'];
  const missing = [];
  
  for (const dep of requiredDeps) {
    if (!pkg.dependencies[dep] && !pkg.devDependencies[dep]) {
      missing.push(dep);
    }
  }
  
  if (missing.length > 0) {
    console.error('❌ Missing dependencies:', missing.join(', '));
    process.exit(1);
  }
  
  console.log('✅ All required dependencies found');
}

function checkViteConfig() {
  console.log('🔍 Checking Vite configuration...');
  if (!fs.existsSync('vite.config.ts')) {
    console.error('❌ vite.config.ts not found');
    process.exit(1);
  }
  console.log('✅ Vite configuration found');
}

function runBuild() {
  console.log('🏗️ Running build...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build completed successfully');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

function checkBuildOutput() {
  console.log('🔍 Checking build output...');
  const distPath = path.join(process.cwd(), 'dist');
  
  if (!fs.existsSync(distPath)) {
    console.error('❌ dist directory not found');
    process.exit(1);
  }
  
  const files = fs.readdirSync(distPath);
  if (!files.includes('index.html')) {
    console.error('❌ index.html not found in dist directory');
    process.exit(1);
  }
  
  console.log('✅ Build output verified');
  console.log('📁 Build files:', files.join(', '));
}

console.log('🚀 Starting build verification...\n');

checkDependencies();
checkViteConfig();
runBuild();
checkBuildOutput();

console.log('\n✨ Build verification completed successfully!'); 