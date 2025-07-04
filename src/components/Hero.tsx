import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 min-h-[80vh] flex items-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Welcome to{' '}
              <span className="text-gradient">MNC Solution</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Smart Tech, Smarter Support. 
              We deliver excellence with modern solutions tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 hover:scale-105 text-center shadow-lg hover:shadow-xl"
              >
                Explore Products
              </Link>
              <Link
                to="/services"
                className="glass text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50/50 transition-all duration-200 hover:scale-105 text-center shadow-lg hover:shadow-xl"
              >
                Our Services
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="animate-scale-in relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src="/images/hero.jpg"
                  alt="Professional workspace"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1OQyBTb2x1dGlvbjwvdGV4dD48L3N2Zz4=';
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"></div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full animate-float stagger-1"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-500/10 rounded-full animate-float stagger-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
