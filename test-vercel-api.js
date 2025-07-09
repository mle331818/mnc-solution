// Test script to verify Vercel API endpoints
const testVercelAPI = async () => {
  const baseURL = 'https://mnc-solution.vercel.app';
  
  console.log('🧪 Testing Vercel API endpoints...\n');
  
  try {
    // Test health endpoint
    console.log('1. Testing /api/health...');
    const healthResponse = await fetch(`${baseURL}/api/health`);
    console.log('Status:', healthResponse.status);
    
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ Health check:', healthData);
    } else {
      console.log('❌ Health check failed:', healthResponse.statusText);
    }
    
    // Test products endpoint
    console.log('\n2. Testing /api/products...');
    const productsResponse = await fetch(`${baseURL}/api/products`);
    console.log('Status:', productsResponse.status);
    
    if (productsResponse.ok) {
      const productsData = await productsResponse.json();
      console.log('✅ Products count:', productsData.length || 'No products');
      if (productsData.length > 0) {
        console.log('Sample product:', productsData[0].name);
      }
    } else {
      console.log('❌ Products API failed:', productsResponse.statusText);
    }
    
    console.log('\n🎉 Test completed!');
    
  } catch (error) {
    console.error('❌ Error testing API:', error.message);
  }
};

// Run the test
testVercelAPI(); 