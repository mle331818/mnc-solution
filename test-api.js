// Test script to verify API endpoints
const testAPI = async () => {
  const baseURL = 'https://mnc-solution.vercel.app';
  
  console.log('🧪 Testing API endpoints...\n');
  
  try {
    // Test health endpoint
    console.log('1. Testing /api/health...');
    const healthResponse = await fetch(`${baseURL}/api/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);
    
    // Test products endpoint
    console.log('\n2. Testing /api/products...');
    const productsResponse = await fetch(`${baseURL}/api/products`);
    const productsData = await productsResponse.json();
    console.log('✅ Products count:', productsData.length || 'No products');
    
    // Test specific category
    console.log('\n3. Testing /api/products?category=cctv...');
    const cctvResponse = await fetch(`${baseURL}/api/products?category=cctv`);
    const cctvData = await cctvResponse.json();
    console.log('✅ CCTV products count:', cctvData.length || 'No CCTV products');
    
    console.log('\n🎉 All tests completed!');
    
  } catch (error) {
    console.error('❌ Error testing API:', error.message);
  }
};

// Run the test
testAPI(); 