import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import Header from '../components/Header';
import { FaWhatsapp, FaFacebookF, FaSearch, FaArrowLeft, FaTag, FaStar, FaTruck, FaShieldAlt } from 'react-icons/fa';
import { useProducts } from '../hooks/useProducts';
import { fetchProductsByCategory } from '../api/products';

const CategoryDetail = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { toast } = useToast();
  const { getCategoryInfo, getAllCategories } = useProducts();
  
  const [showDahuaOnly, setShowDahuaOnly] = useState(false);
  const [showHikvisionOnly, setShowHikvisionOnly] = useState(false);
  const [showXiaomiOnly, setShowXiaomiOnly] = useState(false);
  const [showTplinkOnly, setShowTplinkOnly] = useState(false);
  const [showTuyaOnly, setShowTuyaOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentCategory = getCategoryInfo(category || '');

  // Load products for the category
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (category) {
          const productsResponse = await fetchProductsByCategory(category);
          setProducts(productsResponse.products || []);
        }
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [category]);

  // Filter products based on brand filters
  let filteredProducts = products;
  
  if (showDahuaOnly) {
    filteredProducts = products.filter((p: any) => 
      p.name.toLowerCase().includes('dahua') || p.brand?.toLowerCase().includes('dahua')
    );
  } else if (showHikvisionOnly) {
    filteredProducts = products.filter((p: any) => 
      p.name.toLowerCase().includes('hikvision') || p.brand?.toLowerCase().includes('hikvision')
    );
  } else if (showXiaomiOnly) {
    filteredProducts = products.filter((p: any) => 
      p.name.toLowerCase().includes('xiaomi') || p.brand?.toLowerCase().includes('xiaomi')
    );
  } else if (showTplinkOnly) {
    filteredProducts = products.filter((p: any) => 
      p.name.toLowerCase().includes('tp-link') || p.brand?.toLowerCase().includes('tp-link')
    );
  } else if (showTuyaOnly) {
    filteredProducts = products.filter((p: any) => 
      p.name.toLowerCase().includes('tuya') || p.brand?.toLowerCase().includes('tuya')
    );
  }

  // Apply search filter
  if (searchTerm) {
    filteredProducts = filteredProducts.filter((p: any) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const handleAddToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast({
      title: "Product Added!",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  const handleWhatsAppOrder = (productName: string, price: string) => {
    const message = `Hi! I'm interested in purchasing ${productName} for ${price}. Can you provide more information?`;
    const whatsappUrl = `https://wa.me/+1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleFacebookShare = (productName: string, productUrl: string) => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}&quote=${encodeURIComponent(`Check out this amazing product: ${productName}`)}`;
    window.open(facebookUrl, '_blank');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-red-600 text-xl font-semibold mb-4">{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/products" className="text-white/80 hover:text-white">
                  Products
                </Link>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-white/60">/</span>
                  <span className="text-white">{currentCategory?.title || category}</span>
                </div>
              </li>
            </ol>
          </nav>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {currentCategory?.title || category}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {currentCategory?.description || `Explore our ${category} products`}
            </p>
            
            {/* Search Box */}
            <div className="max-w-md mx-auto mt-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 text-gray-900 bg-white rounded-xl shadow-lg focus:ring-4 focus:ring-blue-300 focus:outline-none"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  setShowDahuaOnly(false);
                  setShowHikvisionOnly(false);
                  setShowXiaomiOnly(false);
                  setShowTplinkOnly(false);
                  setShowTuyaOnly(false);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !showDahuaOnly && !showHikvisionOnly && !showXiaomiOnly && !showTplinkOnly && !showTuyaOnly
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Brands
              </button>
              <button
                onClick={() => {
                  setShowDahuaOnly(true);
                  setShowHikvisionOnly(false);
                  setShowXiaomiOnly(false);
                  setShowTplinkOnly(false);
                  setShowTuyaOnly(false);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showDahuaOnly
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Dahua
              </button>
              <button
                onClick={() => {
                  setShowDahuaOnly(false);
                  setShowHikvisionOnly(true);
                  setShowXiaomiOnly(false);
                  setShowTplinkOnly(false);
                  setShowTuyaOnly(false);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showHikvisionOnly
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Hikvision
              </button>
              <button
                onClick={() => {
                  setShowDahuaOnly(false);
                  setShowHikvisionOnly(false);
                  setShowXiaomiOnly(true);
                  setShowTplinkOnly(false);
                  setShowTuyaOnly(false);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showXiaomiOnly
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Xiaomi
              </button>
              <button
                onClick={() => {
                  setShowDahuaOnly(false);
                  setShowHikvisionOnly(false);
                  setShowXiaomiOnly(false);
                  setShowTplinkOnly(true);
                  setShowTuyaOnly(false);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showTplinkOnly
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                TP-Link
              </button>
              <button
                onClick={() => {
                  setShowDahuaOnly(false);
                  setShowHikvisionOnly(false);
                  setShowXiaomiOnly(false);
                  setShowTplinkOnly(false);
                  setShowTuyaOnly(true);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showTuyaOnly
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tuya
              </button>
            </div>
            
            <div className="text-sm text-gray-600">
              {filteredProducts.length} of {products.length} products
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-xl mb-4">No products found</div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setShowDahuaOnly(false);
                  setShowHikvisionOnly(false);
                  setShowXiaomiOnly(false);
                  setShowTplinkOnly(false);
                  setShowTuyaOnly(false);
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const salePercentage = product.salePrice && product.price > product.salePrice 
                  ? Math.round(((product.price - product.salePrice) / product.price) * 100)
                  : 0;
                const isLowStock = product.stock !== undefined && product.stock <= 5;

                return (
                  <div key={product._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = '/images/placeholder.svg';
                        }}
                      />
                      
                      {/* Sale Badge */}
                      {salePercentage > 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          {salePercentage}% OFF
                        </div>
                      )}
                      
                      {/* Low Stock Badge */}
                      {isLowStock && (
                        <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          Low Stock
                        </div>
                      )}
                      
                      {/* Quick Actions Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                          >
                            Add to Cart
                          </button>
                          <Link
                            to={`/products/${category}/${product._id}`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {product.salePrice ? (
                            <>
                              <span className="text-lg font-bold text-red-600">
                                ${product.salePrice}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                ${product.price}
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-gray-900">
                              ${product.price}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <FaStar className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-gray-600">4.5</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            SKU: {product.sku}
                          </span>
                          {product.stock !== undefined && (
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              product.stock > 10 ? 'bg-green-100 text-green-800' :
                              product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleWhatsAppOrder(product.name, `$${product.salePrice || product.price}`)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Order via WhatsApp"
                          >
                            <FaWhatsapp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleFacebookShare(product.name, window.location.href)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Share on Facebook"
                          >
                            <FaFacebookF className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryDetail; 