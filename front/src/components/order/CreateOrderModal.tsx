import { useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { authAtom } from '../../context/auth';
import { orderService } from '../../services/api';


interface CreateOrderModalProps  {
  isOpen: boolean;
  onClose: () => void;
}

interface UserInfor {
  shipping_address: string;
  shipping_phone: string;
}

function AddToCartModal({isOpen, onClose }: CreateOrderModalProps ) {

  const [infoUser, setInfoUser] = useState<UserInfor>({shipping_address: '', shipping_phone: ''});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [auth] = useAtom(authAtom);
  const navigate = useNavigate();

  const handleCreateDeal = async () => {
    if (!auth.token) {
      navigate('/login');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await orderService.createOrder({
        shipping_address: infoUser.shipping_address,
        shipping_phone: infoUser.shipping_phone
      });
      onClose();
      alert('Create order successfully');
      navigate('/order');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }


  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    onClick={handleBackdropClick}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Tạo order</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label htmlFor="quantity" className="block mb-1">
            Địa chỉ giao hàng:
          </label>
          <input
            type="string"
            id="shipping_address"
            value={infoUser.shipping_address}
            onChange={(e) => setInfoUser({...infoUser, shipping_address: e.target.value})}
            min="1"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block mb-1">
            Số điện thoại:
          </label>
          <input
            type="string"
            id="shipping_phone"
            value={infoUser.shipping_phone}
            onChange={(e) => setInfoUser({...infoUser, shipping_phone: e.target.value})}
            min="1"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleCreateDeal}
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
