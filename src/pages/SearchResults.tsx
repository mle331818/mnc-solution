import { useLocation, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { useProducts } from '@/contexts/ProductContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
=======
import { useProducts } from '../hooks/use-products';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../hooks/use-toast';
import { FaWhatsapp, FaShoppingCart, FaEye, FaSearch, FaArrowLeft } from 'react-icons/fa';
import Header from '../components/Header';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
>>>>>>> cef4a0b0cbe62e39a8109eb2edc0ce507e534264

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
<<<<<<< HEAD
  const { products } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Get search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || params.get('query') || '';
    setSearchQuery(query);
    performSearch(query);
  }, [location.search, products]);

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    // Multi-word search: all words must be present in any field
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    const results = products.filter(product => {
      const haystack = [product.name, product.description, product.category].join(' ').toLowerCase();
      return words.every(word => haystack.includes(word));
    });

    setSearchResults(results);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Results</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2 max-w-md">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Search</Button>
        </div>
      </form>

      {/* Results Count */}
      <p className="text-gray-600 mb-6">
        Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
      </p>

      {/* Results Grid */}
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/products/${product.category.toLowerCase()}/${product.id}`)}
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  No image available
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                <p className="text-blue-600 font-semibold">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">No products found matching your search.</p>
          <Button
            onClick={() => navigate('/products')}
            className="mt-4"
          >
            Browse All Products
          </Button>
        </div>
      )}
=======
  const { data: allProducts, isLoading } = useProducts();
  const { dispatch } = useCart();
  const { toast } = useToast();

  const handleWhatsAppOrder = (productName: string, price: string | number) => {
    const phoneNumber = '96176331818';
    const message = encodeURIComponent(`Hi! I'm interested in ordering ${productName} for $${price}. Please provide more details.`);
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

  // Multi-word search logic
  const terms = searchTerm.trim().toLowerCase().split(/\s+/);
  const filtered = searchTerm.trim() === '' ? [] : (allProducts || []).filter((p: any) => {
    const text = `${p.name} ${p.sku} ${p.description}`.toLowerCase();
    return terms.every(term => text.includes(term));
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg text-gray-600">Searching products...</span>
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
          <button 
            onClick={() => navigate('/products')}
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group"
          >
            <FaArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </button>
          
          <div className="flex items-center mb-4">
            <FaSearch className="w-8 h-8 mr-4 text-blue-200" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Search Results
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed">
            Found {filtered.length} product{filtered.length !== 1 ? 's' : ''} for "{searchTerm}"
          </p>
        </div>
      </section>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <FaSearch className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any products matching "{searchTerm}". Try different keywords or browse our categories.
              </p>
              <button
                onClick={() => navigate('/products')}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse All Products
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {filtered.length} Product{filtered.length !== 1 ? 's' : ''} Found
                </h2>
                <div className="text-sm text-gray-500">
                  Search: "{searchTerm}"
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filtered.map((product: any) => (
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
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">
                      ${product.price}
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute bottom-4 left-4 bg-gray-800/80 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                      {product.category}
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
                      
                      <button
                        onClick={() => navigate(`/products/${product.category}/${product._id}`)}
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
>>>>>>> cef4a0b0cbe62e39a8109eb2edc0ce507e534264
    </div>
  );
};

export default SearchResults; 