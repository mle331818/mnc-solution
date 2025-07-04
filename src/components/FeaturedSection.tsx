import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedSection = () => {
  const features = [
    {
      title: 'Premium Products',
      description: 'High-quality products designed for modern needs',
      image: '/images/products.jpg',
      fallbackImage: '/images/fallback-products.jpg',
      link: '/products',
      badge: 'Featured'
    },
    {
      title: 'Expert Services',
      description: 'Professional services delivered by experienced teams',
      image: '/images/services.jpg',
      fallbackImage: '/images/fallback-services.jpg',
      link: '/services',
      badge: 'Popular'
    },
    {
      title: 'Technology Solutions',
      description: 'Cutting-edge technology solutions for your business',
      image: '/images/solutions.jpg',
      fallbackImage: '/images/fallback-solutions.jpg',
      link: '/products',
      badge: 'New'
    }
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, fallbackImage: string) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== fallbackImage) {
      target.src = fallbackImage;
    } else {
      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1OQyBTb2x1dGlvbjwvdGV4dD48L3N2Zz4=';
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose MNC Solution?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine innovation, quality, and expertise to deliver exceptional results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 group animate-fade-in-up stagger-${index + 1}`}
            >
              <div className="relative">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => handleImageError(e, feature.fallbackImage)}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    {feature.badge}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
                <Link
                  to={feature.link}
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 group-hover:translate-x-2 transform transition-transform"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
