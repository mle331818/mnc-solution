import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/use-products';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery();
  const searchTerm = query.get('query') || '';
  const navigate = useNavigate();
  const { data: allProducts, isLoading } = useProducts();

  // Multi-word search logic
  const terms = searchTerm.trim().toLowerCase().split(/\s+/);
  const filtered = searchTerm.trim() === '' ? [] : (allProducts || []).filter((p: any) => {
    const text = `${p.name} ${p.sku} ${p.description}`.toLowerCase();
    return terms.every(term => text.includes(term));
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-6">Search Results for "{searchTerm}"</h1>
        {filtered.length === 0 ? (
          <div className="text-gray-600">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((product: any) => (
              <div key={product._id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition" onClick={() => navigate(`/products/${product.category}/${product._id}`)}>
                <img src={product.image} alt={product.name} className="h-32 w-full object-contain mb-3" />
                <div className="font-semibold text-base mb-1 text-center">{product.name}</div>
                <div className="text-blue-600 font-bold text-lg mb-2">${product.price}</div>
                <div className="text-xs text-gray-500 text-center">{product.sku}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults; 