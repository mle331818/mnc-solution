import React from 'react';
import { useCart } from '../contexts/CartContext';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedSection from '../components/FeaturedSection';

const Index = () => {
  const { state, dispatch } = useCart();

  const handleRemoveFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    return state.items.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedSection />
      
      {/* Cart Section */}
      {state.items.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Shopping Cart</h2>
                  <p className="text-gray-600 mt-1">You have {state.totalItems} item{state.totalItems !== 1 ? 's' : ''} in your cart</p>
                </div>
                <button
                  onClick={handleClearCart}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  Clear Cart
                </button>
              </div>
              
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {state.items.map((item) => {
                  const itemPrice = parseFloat(item.price.replace(/[^0-9.]/g, ''));
                  const itemTotal = itemPrice * item.quantity;
                  
                  return (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                          <p className="text-gray-600">{item.description}</p>
                          <p className="text-blue-600 font-medium">Price: {item.price}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Quantity</p>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                            >
                              -
                            </button>
                            <span className="w-12 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Item Total</p>
                          <p className="font-semibold text-green-600">${itemTotal.toFixed(2)}</p>
                        </div>
                        
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-right">
                    <p className="text-lg font-semibold">Total Items: {state.totalItems}</p>
                    <p className="text-2xl font-bold text-green-600">Total Price: ${totalPrice.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => {
                      const itemsList = state.items.map(item => 
                        `${item.name} (Qty: ${item.quantity}) - ${item.price}`
                      ).join('\n');
                      const message = encodeURIComponent(`Hi! I want to order these items from my cart:\n\n${itemsList}\n\nTotal: $${totalPrice.toFixed(2)}\n\nPlease provide a quote.`);
                      window.open(`https://wa.me/96176331818?text=${message}`, '_blank');
                    }}
                    className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 text-lg"
                  >
                    Order via WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Additional sections for the homepage */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who trust MNC Solution for their business needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105">
              Get Quote
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MNC Solution</h3>
              <p className="text-gray-400">
                Smart Tech, Smarter Support.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-white transition-colors duration-200">Home</a></li>
                <li><a href="/products" className="hover:text-white transition-colors duration-200">Products</a></li>
                <li><a href="/services" className="hover:text-white transition-colors duration-200">Services</a></li>
                <li><a href="/about" className="hover:text-white transition-colors duration-200">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 info@mncsolution.com</li>
                <li>📞 +961 76331818</li>
                <li>📍 Zouk Mosbeh</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MNC Solution. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
