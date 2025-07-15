import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedSection from '../components/FeaturedSection';

const Index = () => {
  // Simple mobile test
  console.log('Index component loaded on mobile');
  console.log('User agent:', navigator.userAgent);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Test - Remove after debugging */}
      <div className="bg-green-500 text-white p-4 text-center">
        <strong>MOBILE TEST: Index Component Loaded</strong><br/>
        User Agent: {navigator.userAgent.substring(0, 50)}...<br/>
        React Version: {React.version}
      </div>
      
      <Header />
      <Hero />
      <FeaturedSection />
    </div>
  );
};

export default Index;
