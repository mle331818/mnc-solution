import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../hooks/use-toast';
import Header from '../components/Header';
import Barcode from 'react-barcode';
import { FaWhatsapp, FaFacebookF, FaSearch, FaArrowLeft, FaStar, FaTruck, FaShieldAlt, FaEye, FaShoppingCart } from 'react-icons/fa';
import { useProducts } from '../hooks/use-products';
import { useProduct } from '../hooks/use-product';

const ProductDetail = () => {
  const { category, productId } = useParams();
  const { dispatch } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showDahuaOnly, setShowDahuaOnly] = useState(false);
  const [showHikvisionOnly, setShowHikvisionOnly] = useState(false);
  const [showXiaomiOnly, setShowXiaomiOnly] = useState(false);
  const [showTplinkOnly, setShowTplinkOnly] = useState(false);
  const [showTuyaOnly, setShowTuyaOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products for this category
  const { data: categoryProducts, isLoading: categoryLoading } = useProducts();
  const { data: selectedProduct, isLoading: productLoading } = useProduct(productId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category, productId]);

  const handleWhatsAppOrder = (productName: string, price: string) => {
    const phoneNumber = '96176331818';
    const message = encodeURIComponent(`Hi! I'm interested in ordering ${productName} for ${price}. Please provide more details.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleAddToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast({
      title: "Product Added!",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  // Filter products by category
  const currentProducts = categoryProducts?.filter(p => p.category === category) || [];
  
  // If all are off, show all. If one is on, show only that brand. If multiple are on, show those brands.
  let filteredProducts = currentProducts;
  if (category === 'cctv') {
    const brandFilters = [];
    if (showDahuaOnly) brandFilters.push('dahua');
    if (showHikvisionOnly) brandFilters.push('hikvision');
    if (showXiaomiOnly) brandFilters.push('xiaomi');
    if (showTplinkOnly) brandFilters.push('tp-link');
    if (showTuyaOnly) brandFilters.push('tuya');
    if (brandFilters.length > 0) {
      filteredProducts = currentProducts.filter((p: any) =>
        brandFilters.some(brand =>
          p.name?.toLowerCase().includes(brand) ||
          p.sku?.toLowerCase().includes(brand)
        )
      );
    }
  }
  
  // Apply search filter
  if (searchTerm.trim() !== '') {
    const terms = searchTerm.trim().toLowerCase().split(/\s+/);
    filteredProducts = filteredProducts.filter((p: any) => {
      const text = `${p.name} ${p.sku} ${p.description}`.toLowerCase();
      return terms.every(term => text.includes(term));
    });
  }

  if (productLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <FaEye className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Product Not Found</h3>
            <p className="text-gray-600 mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse All Products
            </Link>
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
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/products" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group">
            <FaArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in capitalize">
            {category?.replace('-', ' ')}
          </h1>
          <p className="text-xl mb-8 animate-fade-in text-white/90">
            Browse our selection of {category?.replace('-', ' ')} products
          </p>
        </div>
      </section>

      {/* Search and Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          {/* Search Box */}
          <form
            onSubmit={e => {
              e.preventDefault();
              if (searchTerm.trim() !== '') {
                navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
              }
            }}
            className="relative mb-6"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-transparent text-lg"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </form>

          {/* Brand Filters for CCTV */}
          {category === 'cctv' && (
            <div className="flex flex-wrap gap-3">
              <span className="text-gray-700 font-medium text-sm flex items-center">Filter by brand:</span>
              {[
                { name: 'Dahua', state: showDahuaOnly, setter: setShowDahuaOnly },
                { name: 'Hikvision', state: showHikvisionOnly, setter: setShowHikvisionOnly },
                { name: 'Xiaomi', state: showXiaomiOnly, setter: setShowXiaomiOnly },
                { name: 'TP-Link', state: showTplinkOnly, setter: setShowTplinkOnly },
                { name: 'Tuya', state: showTuyaOnly, setter: setShowTuyaOnly }
              ].map((brand) => (
                <button
                  key={brand.name}
                  onClick={() => brand.setter(!brand.state)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    brand.state 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  }`}
                >
                  {brand.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <FaSearch className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
                <p className="text-gray-600 mb-6">
                  No products match your current filters. Try adjusting your search or filters.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setShowDahuaOnly(false);
                    setShowHikvisionOnly(false);
                    setShowXiaomiOnly(false);
                    setShowTplinkOnly(false);
                    setShowTuyaOnly(false);
                  }}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Results Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''} Found
                  </h2>
                  <div className="text-sm text-gray-500">
                    Category: {category?.replace('-', ' ')}
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product: any) => (
                  <div
                    key={product._id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 cursor-pointer"
                    onClick={() => navigate(`/products/${category}/${product._id}`)}
                  >
                    {/* Product Image Container */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Stock Badge */}
                      {product.stock && Number(product.stock) <= 5 && Number(product.stock) > 0 && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                          Low Stock ({product.stock})
                        </div>
                      )}
                      {product.stock && Number(product.stock) === 0 && (
                        <div className="absolute top-4 right-4 bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                          Out of Stock
                        </div>
                      )}
                      {/* Price Badge */}
                      <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">
                        ${product.price}
                      </div>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                    </div>
                    
                    {/* Product Content */}
                    <div className="p-6">
                      {/* Product Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                        {product.name}
                      </h3>
                      
                      {/* Product Description */}
                      {product.description && (
                        <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                          {product.description}
                        </p>
                      )}
                      
                      {/* Product Details */}
                      <div className="space-y-3 mb-8">
                        {product.sku && (
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium mr-2">SKU:</span>
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                              {product.sku}
                            </span>
                          </div>
                        )}
                        
                        {/* Stock Status */}
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            product.stock && Number(product.stock) > 0 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            <span className={`w-2 h-2 rounded-full mr-2 ${
                              product.stock && Number(product.stock) > 0 ? 'bg-green-500' : 'bg-red-500'
                            }`}></span>
                            {product.stock && Number(product.stock) > 0 
                              ? `In Stock (${product.stock})` 
                              : 'Out of Stock'
                            }
                          </span>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          disabled={!product.stock || Number(product.stock) <= 0}
                          className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
                        >
                          <FaShoppingCart className="text-sm" />
                          Add to Cart
                        </button>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWhatsAppOrder(product.name, product.price);
                          }}
                          className="w-full bg-green-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          <FaWhatsapp className="text-sm" />
                          Buy on WhatsApp
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/products/${category}/${product._id}`);
                          }}
                          className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 transform hover:-translate-y-0.5"
                        >
                          <FaEye className="text-sm" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
