import { Link } from 'react-router-dom';
import type { Product } from '../../types/index';
import { useAtom } from 'jotai';
import { authAtom } from '../../context/auth';
import { wishlistService } from '../../services/api';

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
    <div className="product-card">
      <img src={product.image_url || 'placeholder.jpg'} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Price: {product.price.toLocaleString()} VND</p>
      <Link to={`/products/${product.id}`}>View Details</Link>
      {product.status === 'active' && (
        <button onClick={handleAddToWishlist}>Add to Wishlist</button>
      )}
    </div>
  );
}

export default ProductCard;