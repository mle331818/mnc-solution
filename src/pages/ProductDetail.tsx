import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../hooks/use-toast';
import Header from '../components/Header';
import Barcode from 'react-barcode';
import { FaWhatsapp, FaFacebookF, FaSearch } from 'react-icons/fa';
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
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <p>Loading product...</p>
      </div>
    );
  }

  if (productId && selectedProduct) {
    const isLowStock = selectedProduct.stock && selectedProduct.stock <= 5;
    return (
      <div className="min-h-screen bg-neutral-100 flex flex-col items-center py-8 px-2">
        <Header />
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden mt-8">
          {/* Product Image */}
          <div className="md:w-1/2 w-full flex items-center justify-center bg-neutral-50 p-8 border-b md:border-b-0 md:border-r">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full max-w-xs h-80 object-contain" />
          </div>
          {/* Product Details */}
          <div className="md:w-1/2 w-full flex flex-col p-6 md:p-10">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">{selectedProduct.name}</h1>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg md:text-2xl font-bold text-gray-900">
                ${selectedProduct.price}
              </span>
            </div>
            {isLowStock && (
              <div className="text-red-600 font-semibold mb-2">Hurry, only {selectedProduct.stock} item{selectedProduct.stock > 1 ? 's' : ''} left in stock!</div>
            )}
            <div className="mb-4 text-gray-700 text-base">{selectedProduct.description}</div>
            {/* Info Box */}
            <div className="mb-4 flex flex-wrap gap-6 items-center">
              <div className="text-xs text-gray-600">
                <span className="font-semibold">Stock:</span> {selectedProduct.stock > 0 ? (
                  <span className="text-green-600 ml-1">In Stock ({selectedProduct.stock})</span>
                ) : (
                  <span className="text-red-600 ml-1">Out of Stock</span>
                )}
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <button onClick={() => handleAddToCart(selectedProduct)} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 text-base shadow-md">Add to Cart</button>
              <button onClick={() => handleWhatsAppOrder(selectedProduct.name, selectedProduct.price)} className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-200 text-base shadow-md flex items-center justify-center gap-2">
                <FaWhatsapp className="text-lg" /> Buy on WhatsApp
              </button>
            </div>
            {/* Share Buttons */}
            <div className="flex gap-3 mb-4 items-center">
              <span className="text-gray-500 font-medium text-sm">Share:</span>
              <a href={`https://wa.me/?text=Check%20out%20this%20product%20on%20MyWebsite:%20${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="bg-green-100 text-green-700 p-2 rounded-full hover:bg-green-200 transition-colors"><FaWhatsapp /></a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="bg-blue-100 text-blue-700 p-2 rounded-full hover:bg-blue-200 transition-colors"><FaFacebookF /></a>
            </div>
          </div>
        </div>
        {/* Related Products */}
        {category && (
          <div className="w-full max-w-4xl mt-12">
            <h3 className="font-bold text-lg mb-4 text-gray-900">You may also like</h3>
            <div className="flex gap-6 overflow-x-auto pb-2">
              {currentProducts
                .filter((p: any) => p._id !== selectedProduct._id)
                .map((relProd: any) => (
                  <div key={relProd._id} className="min-w-[200px] max-w-[220px] bg-white border rounded-lg shadow hover:shadow-lg transition cursor-pointer flex-shrink-0 hover:scale-105 duration-200" onClick={() => navigate(`/products/${category}/${relProd._id}`)}>
                    <img src={relProd.image} alt={relProd.name} className="h-32 w-full object-contain rounded-t-lg" />
                    <div className="p-3">
                      <div className="font-semibold text-sm mb-1 line-clamp-2">{relProd.name}</div>
                      <div className="text-blue-600 font-bold text-base">${relProd.price}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (categoryLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/products" className="inline-flex items-center text-blue-200 hover:text-white mb-4">
            ← Back to Products
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in capitalize">
            {category}
          </h1>
          <p className="text-xl mb-8 animate-fade-in">
            Browse our selection of {category} products
          </p>
        </div>
      </section>

      {/* Search Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-4">
        <form
          onSubmit={e => {
            e.preventDefault();
            if (searchTerm.trim() !== '') {
              navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
            }
          }}
          className="relative"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </form>
      </div>

      {/* Brand Filters for CCTV */}
      {category === 'cctv' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowDahuaOnly(!showDahuaOnly)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                showDahuaOnly ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Dahua
            </button>
            <button
              onClick={() => setShowHikvisionOnly(!showHikvisionOnly)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                showHikvisionOnly ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Hikvision
            </button>
            <button
              onClick={() => setShowXiaomiOnly(!showXiaomiOnly)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                showXiaomiOnly ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Xiaomi
            </button>
            <button
              onClick={() => setShowTplinkOnly(!showTplinkOnly)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                showTplinkOnly ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              TP-Link
            </button>
            <button
              onClick={() => setShowTuyaOnly(!showTuyaOnly)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                showTuyaOnly ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Tuya
            </button>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product: any) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group animate-scale-in"
                  onClick={() => navigate(`/products/${category}/${product._id}`)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.stock <= 5 && product.stock > 0 && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Low Stock
                      </div>
                    )}
                    {product.stock === 0 && (
                      <div className="absolute top-2 left-2 bg-gray-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-blue-600">
                        ${product.price}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
