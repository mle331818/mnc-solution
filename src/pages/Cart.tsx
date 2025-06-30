import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const { items } = state;
  
  // State to track selected items
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set(items.map(item => item.id)));

  // Helper to parse price (handles both string and number)
  const parsePrice = (price: string | number) => {
    if (typeof price === 'number') return price;
    return parseFloat(price.replace(/[^\d.]/g, ''));
  };

  // Calculate total only for selected items
  const selectedItemsList = items.filter(item => selectedItems.has(item.id));
  const grandTotal = selectedItemsList.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);

  // Handle checkbox change
  const handleCheckboxChange = (itemId: string) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(itemId)) {
      newSelectedItems.delete(itemId);
    } else {
      newSelectedItems.add(itemId);
    }
    setSelectedItems(newSelectedItems);
  };

  // WhatsApp message only includes selected items
  const whatsappMessage = encodeURIComponent(
    `Hello, I would like to order:\n` +
      selectedItemsList
        .map(
          (item) =>
            `${item.name} (x${item.quantity}) - $${parsePrice(item.price)} each = $${(parsePrice(item.price) * item.quantity).toFixed(2)}`
        )
        .join('\n') +
      `\nTotal: $${grandTotal.toFixed(2)}`
  );

  const whatsappUrl = `https://wa.me/96176331818?text=${whatsappMessage}`;

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
                <th className="border-b p-2">Select</th>
                <th className="border-b p-2">Product</th>
                <th className="border-b p-2">Quantity</th>
                <th className="border-b p-2">Price</th>
                <th className="border-b p-2">Total</th>
                <th className="border-b p-2">Remove</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className={!selectedItems.has(item.id) ? 'opacity-50' : ''}>
                  <td className="border-b p-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      checked={selectedItems.has(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </td>
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
                      className="text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50"
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
            <span className="text-lg font-semibold">Grand Total (Selected Items):</span>
            <span className="text-xl font-bold text-blue-600">${grandTotal.toFixed(2)}</span>
          </div>
          <div className="flex gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded shadow transition-colors duration-200"
            >
              Continue on WhatsApp
            </a>
            <button
              onClick={() => setSelectedItems(new Set(items.map(item => item.id)))}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded shadow transition-colors duration-200"
            >
              Select All
            </button>
            <button
              onClick={() => setSelectedItems(new Set())}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded shadow transition-colors duration-200"
            >
              Deselect All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 