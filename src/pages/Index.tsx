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
