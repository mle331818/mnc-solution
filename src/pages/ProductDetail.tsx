import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../hooks/use-toast';
import Header from '../components/Header';
import { FaWhatsapp } from 'react-icons/fa';
import { Product } from '@/types';
import { fetchProducts } from '@/api/products';

const ProductDetail = () => {
  const { category, productId } = useParams();
  const { dispatch } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category, productId]);

  useEffect(() => {
    setLoading(true);
    fetchProducts({ category: category || '' })
      .then((all) => {
        setProducts(all);
        if (productId) {
          setSelectedProduct(all.find((p) => p._id === productId) || null);
        } else {
          setSelectedProduct(null);
        }
      })
      .finally(() => setLoading(false));
  }, [category, productId]);

  const handleWhatsAppOrder = (productName: string, price: string) => {
    const phoneNumber = '96176331818';
    const message = encodeURIComponent(`Hi! I'm interested in ordering ${productName} for ${price}. Please provide more details.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleAddToCart = (product: Product) => {
    // Map MongoDB _id to the legacy `id` field expected by the CartContext
    const cartItem = {
      ...product,
      id: product.id ?? (product._id as string),
    } as any;

    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    toast({
      title: "Product Added!",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!loading && category && products.length === 0) return <div className="p-8 text-center text-gray-500">No products found for this category.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="w-full max-w-4xl mx-auto p-4">
        {selectedProduct ? (
          <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-8">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-64 h-64 object-contain rounded"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
              <div className="text-blue-600 font-bold text-xl mb-2">
                ${selectedProduct.price}
              </div>
              <div className="mb-2 text-gray-700">
                {selectedProduct.description}
              </div>
              {selectedProduct.features && (
                <ul className="mb-2 text-sm text-gray-600 list-disc pl-5">
                  {selectedProduct.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              )}
              <div className="flex gap-2 mt-4">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded"
                  onClick={() =>
                    handleWhatsAppOrder(
                      selectedProduct.name,
                      String(selectedProduct.price)
                    )
                  }
                >
                  <FaWhatsapp className="inline mr-1" /> WhatsApp
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={() => handleAddToCart(selectedProduct)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <h2 className="text-xl font-bold mb-6 capitalize text-gray-900">
              {category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((prod) => (
                <div
                  key={prod._id}
                  className="bg-white border rounded-lg shadow hover:shadow-lg transition cursor-pointer flex flex-col hover:scale-105 duration-200"
                  onClick={() => navigate(`/products/${category}/${prod._id}`)}
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="h-32 w-full object-contain rounded-t-lg"
                  />
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div className="font-semibold text-sm mb-1 line-clamp-2">
                      {prod.name}
                    </div>
                    <div className="text-blue-600 font-bold text-base">
                      ${prod.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {category && products.length > 1 && selectedProduct && (
          <div className="w-full max-w-4xl mt-12">
            <h3 className="font-bold text-lg mb-4 text-gray-900">You may also like</h3>
            <div className="flex gap-6 overflow-x-auto pb-2">
              {products.filter((p) => p._id !== selectedProduct._id).map((relProd) => (
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
    </div>
  );
};

export default ProductDetail;
