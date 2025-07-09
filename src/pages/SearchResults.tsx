import { useLocation, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { useProducts } from '../hooks/useProducts';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
=======
import { useProducts } from '@/contexts/ProductContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
>>>>>>> f62b2f5b80d8d03bbcfffff3d7ab79b459bf47ae

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
<<<<<<< HEAD
  const { getAllProducts } = useProducts();

  // Gather all products from all categories
  const allProducts = getAllProducts();
=======
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
>>>>>>> f62b2f5b80d8d03bbcfffff3d7ab79b459bf47ae

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
    </div>
  );
};

export default SearchResults; 