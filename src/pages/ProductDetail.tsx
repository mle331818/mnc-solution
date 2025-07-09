import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import Header from '../components/Header';
import Barcode from 'react-barcode';
import { FaWhatsapp, FaFacebookF, FaSearch } from 'react-icons/fa';
import { useProducts } from '../hooks/useProducts';

const ProductDetail = () => {
  const { category, productId } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { toast } = useToast();
  const { getProductsByCategory, getCategoryInfo, getProductById, getAllCategories } = useProducts();
  
  const [showDahuaOnly, setShowDahuaOnly] = useState(false);
  const [showHikvisionOnly, setShowHikvisionOnly] = useState(false);
  const [showXiaomiOnly, setShowXiaomiOnly] = useState(false);
  const [showTplinkOnly, setShowTplinkOnly] = useState(false);
  const [showTuyaOnly, setShowTuyaOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const currentCategory = getCategoryInfo(category || '');
  const products = getProductsByCategory(category || '');

  // Find the selected product if productId is present
  const selectedProduct = productId ? getProductById(productId) : null;

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

  // If we have a selected product, show its detail page
  if (selectedProduct) {
    const salePercentage = selectedProduct.salePrice && selectedProduct.price > selectedProduct.salePrice 
      ? Math.round(((selectedProduct.price - selectedProduct.salePrice) / selectedProduct.price) * 100)
      : 0;
    const isLowStock = selectedProduct.stock !== undefined && selectedProduct.stock <= 5;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/products" className="text-gray-700 hover:text-blue-600">
                  Products
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link to={`/products/${category}`} className="text-gray-700 hover:text-blue-600">
                    {currentCategory?.title || category}
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500">{selectedProduct.name}</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image Section */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
                {/* Sale Badge */}
                {salePercentage > 0 && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-red-500 text-white px-3 py-2 rounded-full text-sm font-bold animate-pulse shadow-lg">
                      {salePercentage}% OFF
                    </div>
                  </div>
                )}
                
                {/* Stock Badge */}
                {selectedProduct.stock === 0 && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse shadow-lg border-2 border-red-800">
                      OUT OF STOCK
                    </div>
                  </div>
                )}

                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-96 object-contain"
                />
              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h1>
                {selectedProduct.brand && (
                  <p className="text-blue-600 font-semibold mb-2">Brand: {selectedProduct.brand}</p>
                )}
                
                {/* Price Section */}
                <div className="flex items-center space-x-4 mb-4">
                  {selectedProduct.stock === 0 && (
                    <span className="bg-red-600 text-white px-4 py-2 rounded-full text-lg font-bold animate-pulse shadow-lg border-2 border-red-800">
                      OUT OF STOCK
                    </span>
                  )}
                  {selectedProduct.salePrice ? (
                    <>
                      <span className="text-3xl font-bold text-red-600">${selectedProduct.salePrice}</span>
                      <span className="text-xl text-gray-400 line-through">${selectedProduct.price}</span>
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {salePercentage}% OFF
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-blue-600">${selectedProduct.price}</span>
                  )}
                </div>

                {/* Stock Status */}
                {selectedProduct.stock !== undefined && selectedProduct.stock > 0 && (
                  <div className="flex items-center space-x-2 mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      isLowStock ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {isLowStock ? 'Low Stock' : 'In Stock'}
                    </span>
                    {isLowStock && (
                      <span className="text-sm text-red-600 font-medium">Only {selectedProduct.stock} left!</span>
                    )}
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
              </div>

              {/* Features */}
              {selectedProduct.features && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Features</h3>
                  <ul className="space-y-1">
                    {selectedProduct.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Product Info */}
              <div className="grid grid-cols-2 gap-4">
                {selectedProduct.sku && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">SKU:</span>
                    <p className="text-sm text-gray-900">{selectedProduct.sku}</p>
                  </div>
                )}
                {selectedProduct.barcode && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Barcode:</span>
                    <p className="text-sm text-gray-900">{selectedProduct.barcode}</p>
                  </div>
                )}
              </div>

              {/* Barcode Display */}
              {selectedProduct.barcode && (
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Product Barcode</h4>
                  <Barcode value={selectedProduct.barcode} />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mb-6">
                <button 
                  onClick={() => handleAddToCart(selectedProduct)} 
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 text-base shadow-md"
                  disabled={selectedProduct.stock === 0}
                  style={selectedProduct.stock === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                >
                  {selectedProduct.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button 
                  onClick={() => handleWhatsAppOrder(selectedProduct.name, `$${selectedProduct.salePrice || selectedProduct.price}`)} 
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-200 text-base shadow-md flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="text-lg" /> Buy on WhatsApp
                </button>
              </div>

              {/* Social Sharing */}
              <div className="border-t pt-6">
                <h4 className="text-sm font-medium text-gray-500 mb-3">Share this product</h4>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleFacebookShare(selectedProduct.name, window.location.href)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Facebook
                  </button>
                  <button 
                    onClick={() => handleWhatsAppOrder(selectedProduct.name, `$${selectedProduct.salePrice || selectedProduct.price}`)}
                    className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                  >
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="mt-16">
            <h3 className="font-bold text-lg mb-4 text-gray-900">You may also like</h3>
            <div className="flex gap-6 overflow-x-auto pb-2">
              {products
                .filter((p: any) => p.id !== selectedProduct.id)
                .slice(0, 4)
                .map((relProd: any) => {
                  const relSalePercentage = relProd.salePrice && relProd.price > relProd.salePrice 
                    ? Math.round(((relProd.price - relProd.salePrice) / relProd.price) * 100)
                    : 0;
                  const relIsLowStock = relProd.stock !== undefined && relProd.stock <= 5;
                  
                  return (
                    <div 
                      key={relProd.id} 
                      className="min-w-[200px] max-w-[220px] bg-white border rounded-lg shadow hover:shadow-lg transition cursor-pointer flex-shrink-0 hover:scale-105 duration-200 relative" 
                      onClick={() => navigate(`/products/${category}/${relProd.id}`)}
                    >
                      {/* Sale Badge */}
                      {relSalePercentage > 0 && (
                        <div className="absolute top-2 left-2 z-10">
                          <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            {relSalePercentage}% OFF
                          </div>
                        </div>
                      )}
                      
                      {/* Stock Badge */}
                      {relProd.stock !== undefined && (
                        <div className="absolute top-2 right-2 z-10">
                          <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                            relIsLowStock ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'
                          }`}>
                            {relIsLowStock ? 'LOW' : 'IN STOCK'}
                          </div>
                        </div>
                      )}

                      <img src={relProd.image} alt={relProd.name} className="h-32 w-full object-contain rounded-t-lg" />
                      <div className="p-3">
                        <h4 className="font-semibold text-sm mb-1 line-clamp-2">{relProd.name}</h4>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex flex-col">
                            {relProd.salePrice ? (
                              <>
                                <span className="text-red-600 font-bold text-sm">${relProd.salePrice}</span>
                                <span className="text-gray-400 line-through text-xs">${relProd.price}</span>
                              </>
                            ) : (
                              <span className="text-blue-600 font-bold text-sm">${relProd.price}</span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(relProd);
                          }}
                          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 text-sm shadow-md"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Category page with product list
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8 md:py-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {currentCategory?.title || 'Products'}
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                {currentCategory?.description || 'Browse our products'}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
                <span className="text-2xl font-bold">{products.length}</span>
                <span className="text-sm opacity-80 ml-2">products</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile Category Selector */}
        <div className="lg:hidden mb-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Categories</h3>
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {getAllCategories().map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => navigate(`/products/${cat.slug}`)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    category === cat.slug
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/25'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                  }`}
                >
                  {cat.title}
                  <span className="ml-2 text-xs opacity-75">({cat.products.length})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <div className="hidden lg:block lg:w-72 flex-shrink-0">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Categories</h3>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
              <div className="space-y-3">
                {getAllCategories().map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => navigate(`/products/${cat.slug}`)}
                    className={`w-full group relative overflow-hidden rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      category === cat.slug
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className={`font-semibold text-left ${
                            category === cat.slug ? 'text-white' : 'text-gray-900'
                          }`}>
                            {cat.title}
                          </div>
                          <div className={`text-sm mt-1 ${
                            category === cat.slug ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {cat.products.length} products
                          </div>
                        </div>
                        <div className={`flex items-center ${
                          category === cat.slug ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'
                        }`}>
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {category === cat.slug && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-700/10 rounded-xl"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                
                {/* Brand Filters */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setShowDahuaOnly(!showDahuaOnly)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      showDahuaOnly ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Dahua
                  </button>
                  <button
                    onClick={() => setShowHikvisionOnly(!showHikvisionOnly)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      showHikvisionOnly ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Hikvision
                  </button>
                  <button
                    onClick={() => setShowXiaomiOnly(!showXiaomiOnly)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      showXiaomiOnly ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Xiaomi
                  </button>
                  <button
                    onClick={() => setShowTplinkOnly(!showTplinkOnly)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      showTplinkOnly ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    TP-Link
                  </button>
                  <button
                    onClick={() => setShowTuyaOnly(!showTuyaOnly)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      showTuyaOnly ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Tuya
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredProducts.map((product: any) => (
                    <div
                      key={product.id}
                      className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
                      onClick={() => navigate(`/products/${category}/${product.id}`)}
                    >
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-40 object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.salePrice && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                            SALE
                          </div>
                        )}
                        {product.stock === 0 && (
                          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                            Out of Stock
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
                          {product.name}
                        </h3>
                        
                        <div className="mb-2">
                          {product.salePrice ? (
                            <div className="flex items-center flex-wrap gap-1">
                              <span className="text-lg font-bold text-red-600">
                                ${product.salePrice}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                ${product.price}
                              </span>
                              <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                                Save {Math.round(100 - (Number(product.salePrice) / Number(product.price)) * 100)}%
                              </span>
                            </div>
                          ) : (
                            <span className="text-lg font-bold text-gray-900">
                              ${product.price}
                            </span>
                          )}
                        </div>
                        
                        {product.sku && (
                          <p className="text-xs text-gray-500 mb-2">SKU: {product.sku}</p>
                        )}
                        
                        <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                          {product.description}
                        </p>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                            className="flex-1 bg-blue-600 text-white px-2 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
                          >
                            Add to Cart
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleWhatsAppOrder(product.name, `$${product.salePrice || product.price}`);
                            }}
                            className="flex-1 bg-green-600 text-white px-2 py-1.5 rounded-lg text-xs font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                          >
                            <FaWhatsapp className="text-xs mr-1" />
                            Buy WhatsApp
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 