import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const { items } = state;

  // Helper to parse price string
  const parsePrice = (price: string) => parseFloat(price.replace(/[^\d.]/g, ''));

  const grandTotal = items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);

  // WhatsApp message
  const whatsappMessage = encodeURIComponent(
    `Hello, I would like to order:\n` +
      items
        .map(
          (item) =>
            `${item.name} (x${item.quantity}) - $${parsePrice(item.price)} each = $${(parsePrice(item.price) * item.quantity).toFixed(2)}`
        )
        .join('\n') +
      `\nTotal: $${grandTotal.toFixed(2)}`
  );

  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {items.length === 0 ? (
        <div className="text-center py-10">
          <p className="mb-4">Your cart is empty.</p>
          <Link to="/products" className="text-blue-600 hover:underline">Continue Shopping</Link>
        </div>
      ) : (
        <div className="space-y-6">
          <table className="w-full text-left border-collapse mb-6">
            <thead>
              <tr>
                <th className="border-b p-2">Product</th>
                <th className="border-b p-2">Quantity</th>
                <th className="border-b p-2">Price</th>
                <th className="border-b p-2">Total</th>
                <th className="border-b p-2">Remove</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="border-b p-2">{item.name}</td>
                  <td className="border-b p-2">
                    <div className="flex items-center space-x-2">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="border-b p-2">${parsePrice(item.price)}</td>
                  <td className="border-b p-2">${(parsePrice(item.price) * item.quantity).toFixed(2)}</td>
                  <td className="border-b p-2">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-semibold">Grand Total:</span>
            <span className="text-xl font-bold text-blue-600">${grandTotal.toFixed(2)}</span>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded shadow transition-colors duration-200"
          >
            Continue on WhatsApp
          </a>
        </div>
      )}
    </div>
  );
};

export default Cart; 