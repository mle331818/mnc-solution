import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useProducts } from '../hooks/useProducts';
import { FaSearch, FaArrowRight, FaStar, FaTruck, FaShieldAlt, FaTag } from 'react-icons/fa';

const Products = () => {
  const productCategories = [
    {
      name: 'CCTV',
      description: 'Security cameras and surveillance systems',
      image: '/images/dahua.png',
      itemCount: '20+ systems',
      slug: 'cctv',
      color: 'blue'
    },
    {
      name: 'Network Solution',
      description: 'Latest networking devices and solutions',
      image: '/images/tplink.png',
      itemCount: '50+ items',
      slug: 'network-solution',
      color: 'purple'
    },
    {
      name: 'Softwares',
      description: 'Custom software and applications',
      image: '/images/categories/software.jpg',
      itemCount: '25+ solutions',
      slug: 'softwares',
      color: 'green'
    },
    {
      name: 'Computer and Laptops',
      description: 'Quality hardware and computing solutions',
      image: '/images/categories/computer.jpg',
      itemCount: '100+ components',
      slug: 'computer-laptops',
      color: 'orange'
    },
    {
      name: 'Satellite',
      description: 'Professional satellite and communication tools',
      image: '/images/categories/satellite.jpg',
      itemCount: '30+ tools',
      slug: 'satellite',
      color: 'indigo'
    },
    {
      name: 'Fiber Solution',
      description: 'Digital products and online services',
      image: '/images/categories/fiber.jpg',
      itemCount: '40+ services',
      slug: 'fiber-solution',
      color: 'teal'
    },
    {
      name: 'Interphone Solution',
      description: 'Expert consultation and advisory services',
      image: '/images/categories/interphone.jpg',
      itemCount: '15+ packages',
      slug: 'interphone-solution',
      color: 'pink'
    },
    {
      name: '3D Printers & CNC',
      description: '3D printing and CNC machining solutions',
      image: '/images/3d-printer.jpg',
      itemCount: '10+ machines',
      slug: '3d-printers-cnc',
      color: 'gray'
    },
    {
      name: 'Automation System',
      description: 'Smart automation and control systems',
      image: '/images/categories/automation.jpg',
      itemCount: '15+ systems',
      slug: 'automation-system',
      color: 'emerald'
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { getAllProducts } = useProducts();

  // Get all products and calculate category stats
  const allProducts = getAllProducts();

  // Calculate item counts and sale info for each category
  const categoryStats = productCategories.reduce((acc, category) => {
    const categoryProducts = allProducts.filter(p => p.category === category.slug);
    const totalProducts = categoryProducts.length;
    const onSaleProducts = categoryProducts.filter(p => p.salePrice && p.salePrice < p.price).length;
    acc[category.slug] = {
      total: totalProducts,
      onSale: onSaleProducts
    };
    return acc;
  }, {} as Record<string, { total: number; onSale: number }>);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const getCategoryGradient = (color: string) => {
    const gradients = {
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600',
      green: 'from-green-500 to-green-600',
      orange: 'from-orange-500 to-orange-600',
      indigo: 'from-indigo-500 to-indigo-600',
      teal: 'from-teal-500 to-teal-600',
      pink: 'from-pink-500 to-pink-600',
      gray: 'from-gray-500 to-gray-600',
      emerald: 'from-emerald-500 to-emerald-600'
    };
    return gradients[color as keyof typeof gradients] || gradients.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Our Products
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in text-white/90 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of high-quality products designed to meet your needs
          </p>
          
          {/* Search Box */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-14 pr-20 text-gray-900 bg-white rounded-2xl shadow-lg focus:ring-4 focus:ring-blue-300 focus:outline-none text-lg"
              />
              <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="flex items-center text-white/80">
              <FaStar className="w-6 h-6 mr-3 text-yellow-300" />
              <span className="text-lg font-semibold">Premium Quality</span>
            </div>
            <div className="flex items-center text-white/80">
              <FaTruck className="w-6 h-6 mr-3 text-blue-200" />
              <span className="text-lg font-semibold">Fast Delivery</span>
            </div>
            <div className="flex items-center text-white/80">
              <FaShieldAlt className="w-6 h-6 mr-3 text-green-200" />
              <span className="text-lg font-semibold">Warranty</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of products organized by category for easy navigation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((category, index) => {
              const stats = categoryStats[category.slug];
              const totalItems = stats?.total || 0;
              const onSaleItems = stats?.onSale || 0;
              
              return (
              <Link
                key={index}
                to={`/products/${category.slug}`}
                  className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer transform hover:-translate-y-2 border border-gray-100 relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                  {/* Modern Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(category.color)} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                <div className="relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder.svg';
                    }}
                  />
                    
                    {/* Dynamic Count Badge */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-full text-sm font-bold shadow-lg border border-gray-200">
                      {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </div>
                    
                    {/* Sale Badge */}
                    {onSaleItems > 0 && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg animate-pulse">
                        <FaTag className="inline w-3 h-3 mr-1" />
                        {onSaleItems} on sale
                      </div>
                    )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                
                  <div className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                      <div className="flex items-center space-x-2">
                    <FaArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {category.description}
                  </p>
                  
                    {/* Modern Stats Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-${category.color}-100 text-${category.color}-800 shadow-sm`}>
                          {totalItems} Available
                        </div>
                        {onSaleItems > 0 && (
                          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 shadow-sm">
                            <FaTag className="w-2 h-2 mr-1" />
                            {onSaleItems} Sale
                          </div>
                        )}
                      </div>
                      
                      {/* Explore Button */}
                      <div className={`px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryGradient(category.color)} text-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                        Explore
                      </div>
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
