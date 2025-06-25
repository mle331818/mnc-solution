import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const Products = () => {
  const productCategories = [
    {
      name: 'CCTV',
      description: 'Security cameras and surveillance systems',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&q=80',
      itemCount: '20+ systems',
      slug: 'cctv'
    },
    {
      name: 'Network Solution',
      description: 'Latest electronic devices and gadgets',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      itemCount: '50+ items',
      slug: 'network-solution'
    },
    {
      name: 'Softwares',
      description: 'Custom software and applications',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80',
      itemCount: '25+ solutions',
      slug: 'softwares'
    },
    {
      name: 'Computer and Laptops',
      description: 'Quality hardware parts and components',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80',
      itemCount: '100+ components',
      slug: 'computer-laptops'
    },
    {
      name: 'Satellite',
      description: 'Professional business and productivity tools',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      itemCount: '30+ tools',
      slug: 'satellite'
    },
    {
      name: 'Fiber Solution',
      description: 'Digital products and online services',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
      itemCount: '40+ services',
      slug: 'fiber-solution'
    },
    {
      name: 'Interphone Solution',
      description: 'Expert consultation and advisory services',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
      itemCount: '15+ packages',
      slug: 'interphone-solution'
    },
    {
      name: '3D Printers & CNC',
      description: '3D printing and CNC machining solutions',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
      itemCount: '10+ machines',
      slug: '3d-printers-cnc'
    },
    {
      name: 'Automation System',
      description: 'Smart automation and control systems',
      image: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&w=600&q=80',
      itemCount: '15+ systems',
      slug: 'automation-system'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Our Products
          </h1>
          <p className="text-xl mb-8 animate-fade-in">
            Discover our comprehensive range of high-quality products
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((category, index) => (
              <Link
                key={index}
                to={`/products/${category.slug}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-32 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-blue-600 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
                    {category.itemCount}
                  </div>
                </div>
                <div className="p-3 sm:p-6">
                  <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {category.name}
                  </h3>
                  <p className="text-xs sm:text-gray-600 sm:text-base">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
