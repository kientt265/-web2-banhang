import { Link } from 'react-router-dom';
import type { Product } from '../../types/index';
import { useAtom } from 'jotai';
import { authAtom } from '../../context/auth';
import { wishlistService } from '../../services/api';
import cartadd_icon from '../../assets/addcart_icon.png';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const [auth] = useAtom(authAtom);

  const handleAddToWishlist = async () => {
    if (!auth.token) {
      alert('Please login to add to wishlist');
      return;
    }
    try {
      await wishlistService.addItem({ product_id: product.id });
      alert('Added to wishlist');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="product-card bg-gray-400 rounded p-2  cursor-pointer">
      <img src={product.image_url || 'placeholder.jpg'} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Price: {product.price.toLocaleString()} VND</p>
      <div className='flex gap-2 items-center'>
        <Link to={`/products/${product.id}`}>View Details</Link>
        {product.status === 'active' && (
          <button onClick={handleAddToWishlist} className="p-2  text-white rounded hover:bg-red-600 scale-75 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>
      )}
      {product.status === 'active' && (
          <button onClick={handleAddToWishlist} className="flex items-center justify-center p-2  text-white rounded hover:bg-green-600 transition duration-200 cursor-pointer">
          <img src={cartadd_icon} className="w-5 h-5" alt="" />
        </button>
      )}
      </div>
    </div>
  );
}

export default ProductCard;