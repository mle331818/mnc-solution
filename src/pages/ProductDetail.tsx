import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import Header from '../components/Header';
import Barcode from 'react-barcode';
import { FaWhatsapp, FaFacebookF, FaSearch } from 'react-icons/fa';
import { useProducts } from '@/contexts/ProductContext';

const ProductDetail = () => {
  const { category, productId } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { toast } = useToast();
  const { products } = useProducts();

  // Only use dynamic products from context
  const categorySlug = category || '';
  const allCategoryProducts = products.filter(p => p.category === categorySlug);
  // Find the selected product
  const selectedProduct = allCategoryProducts.find((p: any) => p.id === productId);

  const handleAddToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast({
      title: "Product Added!",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  const handleWhatsAppOrder = (productName: string, price: number) => {
    const message = `Hi! I'm interested in purchasing ${productName} for $${price}. Can you provide more information?`;
    const whatsappUrl = `https://wa.me/+1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleFacebookShare = (productName: string, productUrl: string) => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}&quote=${encodeURIComponent(`Check out this amazing product: ${productName}`)}`;
    window.open(facebookUrl, '_blank');
  };

  // If no productId, show category listing
  if (!productId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">{categorySlug.replace(/-/g, ' ').toUpperCase()}</h1>
            <Link to="/products" className="text-blue-600 hover:text-blue-800">
              ← Back to Categories
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allCategoryProducts.map((product: any) => {
              const salePercentage = product.salePrice && product.price > product.salePrice 
                ? Math.round(((product.price - product.salePrice) / product.price) * 100)
                : 0;
              const isLowStock = product.stock !== undefined && product.stock <= 5;
              
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer relative"
                  onClick={() => navigate(`/products/${category}/${product.id}`)}
                >
                  {/* Sale Badge */}
                  {salePercentage > 0 && (
                    <div className="absolute top-2 left-2 z-10">
                      <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                        {salePercentage}% OFF
                      </div>
                    </div>
                  )}
                  
                  {/* Stock Badge */}
                  {product.stock === 0 && (
                    <div className="absolute top-2 right-2 z-10">
                      <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse shadow-lg border-2 border-red-800">
                        OUT OF STOCK
                      </div>
                    </div>
                  )}

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        {product.salePrice ? (
                          <>
                            <span className="text-red-600 font-semibold text-lg">${product.salePrice}</span>
                            <span className="text-gray-400 line-through text-sm">${product.price}</span>
                          </>
                        ) : (
                          <span className="text-blue-600 font-semibold text-lg">${product.price}</span>
                        )}
                      </div>
                      {product.stock !== undefined && (
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          isLowStock ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {product.stock} left
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {allCategoryProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p>Sorry, we couldn't find the product you're looking for.</p>
          <Link to={`/products/${category}`} className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            ← Back to Category
          </Link>
        </div>
      </div>
    );
  }

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
                  {categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)}
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
            
            {/* Product Gallery (if available) */}
            {selectedProduct.gallery && (
              <div className="grid grid-cols-4 gap-2">
                {selectedProduct.gallery.map((img: string, index: number) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${selectedProduct.name} ${index + 1}`}
                    className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75"
                  />
                ))}
              </div>
            )}
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
                onClick={() => handleWhatsAppOrder(selectedProduct.name, selectedProduct.salePrice || selectedProduct.price)} 
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
                  onClick={() => handleWhatsAppOrder(selectedProduct.name, selectedProduct.salePrice || selectedProduct.price)}
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
            {allCategoryProducts
              .filter((p: any) => p.id !== selectedProduct.id)
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
};

export default ProductDetail; 