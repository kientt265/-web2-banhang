import { useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { cartService } from '../../services/api';
import { authAtom } from '../../context/auth';
import type { Product } from '../../types';

interface AddToCartModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

function AddToCartModal({ product, isOpen, onClose }: AddToCartModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [auth] = useAtom(authAtom);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!auth.token) {
      navigate('/login');
      return;
    }

    if (quantity < 1 || quantity > product.stock_quantity) {
      setError(`Quantity must be between 1 and ${product.stock_quantity}`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await cartService.addItem({ product_id: product.id, quantity });
      onClose();
      alert('Added to cart successfully');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add to Cart</h2>
        <div className="flex gap-4 mb-4">
          <img
            src={product.image_url || 'placeholder.jpg'}
            alt={product.name}
            className="w-24 h-24 object-cover rounded"
          />
          <div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p>Price: {product.price.toLocaleString()} VND</p>
            <p>Available: {product.stock_quantity} in stock</p>
          </div>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label htmlFor="quantity" className="block mb-1">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            min="1"
            max={product.stock_quantity}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleAddToCart}
            className={`p-2 rounded text-white ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add to Cart'}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded bg-gray-300 hover:bg-gray-400 text-black"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddToCartModal;
