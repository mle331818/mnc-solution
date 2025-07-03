import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import { getProductsByCat } from "../api";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../components/ProductForm";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../hooks/use-toast";
import { FaWhatsapp, FaShoppingCart, FaEye } from "react-icons/fa";

export default function CategoryProducts() {
  const { category = "" } = useParams();
  const { dispatch } = useCart();
  const { toast } = useToast();
  
  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: () => getProductsByCat(category).then((r) => r.data as Product[]),
  });

  const handleWhatsAppOrder = (productName: string, price: string | number) => {
    const phoneNumber = '96176331818';
    const message = encodeURIComponent(`Hi! I'm interested in ordering ${productName} for $${price}. Please provide more details.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast({
      title: "Product Added!",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/products" className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 capitalize">
            {category}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl">
            Discover our premium selection of {category} products with cutting-edge technology and exceptional quality
          </p>
        </div>
      </section>

      {isLoading ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg text-gray-600">Loading products...</span>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {category === 'cctv' ? (
            // Modern enhanced layout for CCTV products
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {data?.map((product) => (
                <div key={product._id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200">
                  {/* Product Image Container */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-64 object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Stock Badge */}
                    {product.stock && Number(product.stock) <= 5 && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        Low Stock ({product.stock})
                      </div>
                    )}
                    {/* Price Badge */}
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">
                      ${product.price}
                    </div>
                  </div>
                  
                  {/* Product Content */}
                  <div className="p-8">
                    {/* Product Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
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
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.stock || Number(product.stock) <= 0}
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <FaShoppingCart className="text-sm" />
                        Add to Cart
                      </button>
                      
                      <button 
                        onClick={() => handleWhatsAppOrder(product.name, product.price)}
                        className="w-full bg-green-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <FaWhatsapp className="text-sm" />
                        Buy on WhatsApp
                      </button>
                      
                      <Link
                        to={`/products/${category}/${product._id}`}
                        className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300"
                      >
                        <FaEye className="text-sm" />
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Modern standard layout for other categories
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {data?.map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${category}/${product._id}`}
                  className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
                >
                  <div className="relative overflow-hidden bg-gray-50">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-40 object-contain p-4 group-hover:scale-110 transition-transform duration-300" 
                    />
                    <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                      ${product.price}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    {product.sku && (
                      <p className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                        {product.sku}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 