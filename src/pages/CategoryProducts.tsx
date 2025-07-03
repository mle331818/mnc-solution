import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import { getProductsByCat } from "../api";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../components/ProductForm";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../hooks/use-toast";
import { FaWhatsapp, FaShoppingCart, FaEye, FaStar, FaTruck, FaShieldAlt } from "react-icons/fa";

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

  // Get category-specific styling
  const getCategoryStyle = () => {
    const styles = {
      'cctv': { gradient: 'from-blue-600 via-blue-700 to-indigo-800', accent: 'blue' },
      'network-solution': { gradient: 'from-purple-600 via-purple-700 to-indigo-800', accent: 'purple' },
      'softwares': { gradient: 'from-green-600 via-green-700 to-teal-800', accent: 'green' },
      'computer-laptops': { gradient: 'from-orange-600 via-orange-700 to-red-800', accent: 'orange' },
      'satellite': { gradient: 'from-indigo-600 via-indigo-700 to-purple-800', accent: 'indigo' },
      'fiber-solution': { gradient: 'from-teal-600 via-teal-700 to-cyan-800', accent: 'teal' },
      'interphone-solution': { gradient: 'from-pink-600 via-pink-700 to-rose-800', accent: 'pink' },
      '3d-printers-cnc': { gradient: 'from-gray-600 via-gray-700 to-slate-800', accent: 'gray' },
      'automation-system': { gradient: 'from-emerald-600 via-emerald-700 to-green-800', accent: 'emerald' }
    };
    return styles[category as keyof typeof styles] || styles.cctv;
  };

  const categoryStyle = getCategoryStyle();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className={`bg-gradient-to-r ${categoryStyle.gradient} text-white py-20 relative overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/products" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group">
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 capitalize">
            {category.replace('-', ' ')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed">
            Discover our premium selection of {category.replace('-', ' ')} products with cutting-edge technology and exceptional quality
          </p>
          
          {/* Category Stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center text-white/80">
              <FaStar className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="text-lg font-semibold">Premium Quality</span>
            </div>
            <div className="flex items-center text-white/80">
              <FaTruck className="w-5 h-5 mr-2 text-blue-200" />
              <span className="text-lg font-semibold">Fast Delivery</span>
            </div>
            <div className="flex items-center text-white/80">
              <FaShieldAlt className="w-5 h-5 mr-2 text-green-200" />
              <span className="text-lg font-semibold">Warranty</span>
            </div>
          </div>
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
          {/* Products Count */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {data?.length || 0} Products Found
              </h2>
              <div className="text-sm text-gray-500">
                Showing all {category.replace('-', ' ')} products
              </div>
            </div>
          </div>

          {/* Modern Enhanced Layout for ALL categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {data?.map((product) => (
              <div key={product._id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
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
                  <div className={`absolute top-4 left-4 bg-${categoryStyle.accent}-600 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg`}>
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
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.stock || Number(product.stock) <= 0}
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
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
                      className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 transform hover:-translate-y-0.5"
                    >
                      <FaEye className="text-sm" />
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {(!data || data.length === 0) && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any products in the {category.replace('-', ' ')} category at the moment.
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Browse All Products
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 