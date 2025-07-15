import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import Header from '../components/Header';
import Barcode from 'react-barcode';
import { FaWhatsapp, FaFacebookF, FaSearch } from 'react-icons/fa';
import { useProducts } from '../hooks/useProducts';
import { fetchProductsByCategory, fetchProductById } from '../api/products';

const ProductDetail = () => {
  const { category, productId } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { toast } = useToast();
  const { getCategoryInfo, getAllCategories } = useProducts();
  
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentCategory = getCategoryInfo(category || '');

  // Load selected product
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load selected product
        if (productId) {
          try {
            const product = await fetchProductById(productId);
            setSelectedProduct(product);
          } catch (err) {
            console.error('Error loading product:', err);
            setError('Product not found');
          }
        } else {
          setError('Product ID is required');
        }
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [productId]);



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
              {selectedProduct.features && selectedProduct.features.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Features</h3>
                  <ul className="space-y-2">
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
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {selectedProduct.sku && (
                    <div>
                      <span className="font-semibold text-gray-700">SKU:</span>
                      <span className="ml-2 text-gray-600">{selectedProduct.sku}</span>
                    </div>
                  )}
                {selectedProduct.barcode && (
                    <div>
                      <span className="font-semibold text-gray-700">Barcode:</span>
                      <span className="ml-2 text-gray-600">{selectedProduct.barcode}</span>
                    </div>
                  )}
                  {selectedProduct.stock !== undefined && (
                    <div>
                      <span className="font-semibold text-gray-700">Stock:</span>
                      <span className="ml-2 text-gray-600">{selectedProduct.stock} units</span>
                    </div>
                  )}
                  {selectedProduct.category && (
                    <div>
                      <span className="font-semibold text-gray-700">Category:</span>
                      <span className="ml-2 text-gray-600 capitalize">{selectedProduct.category}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {selectedProduct.stock > 0 ? (
                  <button
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    disabled
                    className="flex-1 bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold cursor-not-allowed"
                  >
                    Out of Stock
                  </button>
                )}
                
                <button
                  onClick={() => handleWhatsAppOrder(selectedProduct.name, `$${selectedProduct.salePrice || selectedProduct.price}`)}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <FaWhatsapp className="mr-2" />
                  Buy via WhatsApp
                </button>
              </div>

              {/* Share Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => handleFacebookShare(selectedProduct.name, window.location.href)}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <FaFacebookF />
                  <span>Share on Facebook</span>
              </button>
            </div>

              {/* Barcode Display */}
              {selectedProduct.barcode && (
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Product Barcode</h3>
                  <div className="flex justify-center">
                    <Barcode value={selectedProduct.barcode} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no product is selected, show error
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-red-600 text-xl font-semibold mb-4">Product not found</div>
          <Link 
            to="/products" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;