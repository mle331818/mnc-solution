import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../hooks/use-toast';
import Header from '../components/Header';
import Barcode from 'react-barcode';
import { FaWhatsapp, FaFacebookF, FaSearch } from 'react-icons/fa';
import { useProducts } from '../hooks/useProducts';

const ProductDetail = () => {
  const { category, productId } = useParams();
  const { dispatch } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { getProductsByCategory, getCategoryInfo, getProductById, getAllCategories } = useProducts();
  
  const [showDahuaOnly, setShowDahuaOnly] = useState(false);
  const [showHikvisionOnly, setShowHikvisionOnly] = useState(false);
  const [showXiaomiOnly, setShowXiaomiOnly] = useState(false);
  const [showTplinkOnly, setShowTplinkOnly] = useState(false);
  const [showTuyaOnly, setShowTuyaOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  // If we have a selected product, show its detail page
  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Product Detail */}
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              {/* Product Image */}
              <div className="md:w-1/2 p-6">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-96 object-contain rounded-lg"
                />
              </div>
              
              {/* Product Info */}
              <div className="md:w-1/2 p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {selectedProduct.name}
                </h1>
                
                <div className="mb-4">
                  {selectedProduct.salePrice ? (
                    <div className="flex items-center">
                      <span className="text-3xl font-bold text-red-600">
                        ${selectedProduct.salePrice}
                      </span>
                      <span className="text-xl text-gray-500 line-through ml-2">
                        ${selectedProduct.price}
                      </span>
                      <span className="ml-3 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Save {Math.round(100 - (Number(selectedProduct.salePrice) / Number(selectedProduct.price)) * 100)}%
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold text-gray-900">
                      ${selectedProduct.price}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-6">
                  {selectedProduct.description}
                </p>
                
                {selectedProduct.sku && (
                  <div className="mb-4">
                    <span className="text-sm text-gray-500">SKU: {selectedProduct.sku}</span>
                  </div>
                )}
                
                {selectedProduct.stock !== undefined && (
                  <div className="mb-4">
                    <span className={`text-sm ${selectedProduct.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedProduct.stock > 0 ? `In Stock (${selectedProduct.stock})` : 'Out of Stock'}
                    </span>
                  </div>
                )}
                
                {selectedProduct.barcode && (
                  <div className="mb-4">
                    <Barcode value={selectedProduct.barcode} />
                  </div>
                )}
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                  
                  <button
                    onClick={() => handleWhatsAppOrder(selectedProduct.name, `$${selectedProduct.salePrice || selectedProduct.price}`)}
                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <FaWhatsapp className="mr-2" />
                    Order via WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Back to Category */}
          <div className="mt-6">
            <Link
              to={`/products/${category}`}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              ← Back to {currentCategory?.title || 'Products'}
            </Link>
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
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {currentCategory?.title || 'Products'}
          </h1>
          <p className="text-xl mb-8">
            {currentCategory?.description || 'Browse our products'}
          </p>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {getAllCategories().map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => navigate(`/products/${cat.slug}`)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      category === cat.slug
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium">{cat.title}</div>
                    <div className="text-sm opacity-75">{cat.products.length} products</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                {/* Brand Filters */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setShowDahuaOnly(!showDahuaOnly)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      showDahuaOnly ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Dahua
                  </button>
                  <button
                    onClick={() => setShowHikvisionOnly(!showHikvisionOnly)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      showHikvisionOnly ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Hikvision
                  </button>
                  <button
                    onClick={() => setShowXiaomiOnly(!showXiaomiOnly)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      showXiaomiOnly ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Xiaomi
                  </button>
                  <button
                    onClick={() => setShowTplinkOnly(!showTplinkOnly)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      showTplinkOnly ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    TP-Link
                  </button>
                  <button
                    onClick={() => setShowTuyaOnly(!showTuyaOnly)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      showTuyaOnly ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product: any) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                      onClick={() => navigate(`/products/${category}/${product.id}`)}
                    >
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-contain p-4"
                        />
                        {product.salePrice && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            SALE
                          </div>
                        )}
                        {product.stock === 0 && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            Out of Stock
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        
                        <div className="mb-2">
                          {product.salePrice ? (
                            <div className="flex items-center">
                              <span className="text-lg font-bold text-red-600">
                                ${product.salePrice}
                              </span>
                              <span className="text-sm text-gray-500 line-through ml-2">
                                ${product.price}
                              </span>
                              <span className="ml-2 bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-semibold">
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
                        
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                          {product.description}
                        </p>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                            className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                          >
                            Add to Cart
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleWhatsAppOrder(product.name, `$${product.salePrice || product.price}`);
                            }}
                            className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
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
