import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useProducts } from '@/contexts/ProductContext';

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

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { products } = useProducts();

  // Calculate item counts and sale info for each category (dynamic only)
  const categoryStats = productCategories.reduce((acc, category) => {
    const dynamicProducts = products.filter(p => p.category === category.slug);
    const totalProducts = dynamicProducts.length;
    const onSaleProducts = dynamicProducts.filter(p => p.salePrice && p.salePrice < p.price).length;
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
            {productCategories.map((category, index) => {
              const stats = categoryStats[category.slug];
              const hasSales = stats.onSale > 0;
              
              return (
                <Link
                  key={index}
                  to={`/products/${category.slug}`}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group animate-scale-in relative"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Sale Badge */}
                  {hasSales && (
                    <div className="absolute top-2 left-2 z-10">
                      <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                        SALE!
                      </div>
                    </div>
                  )}
                  <div className="relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-32 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-blue-600 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
                      {stats.total} items
                    </div>
                  </div>
                  <div className="p-3 sm:p-6">
                    <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-gray-600 sm:text-base mb-3">
                      {category.description}
                    </p>
                    {/* Category Stats */}
                    <div className="flex flex-wrap gap-2 text-xs">
                      {hasSales && (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
                          {stats.onSale} on sale
                        </span>
                      )}
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
