import { Link } from 'react-router-dom';
import type { Cart, CartItem } from '../../types/index';

interface CartItemProps {
    cartItem: CartItem;
}
function CartItemCard({ cartItem }: CartItemProps) {
    return (
        // <div>
        //     {
        //         cart.items?.map((item)=> (
        //             <div>{item.image_url}</div>
        //         ))
        //     }
        // </div>
        <div className="product-card bg-gray-400 rounded p-2  cursor-pointer">
            <img src={cartItem.image_url || 'placeholder.jpg'} alt={cartItem.name} />
            <h3>{cartItem.name}</h3>
            <p>Price: {cartItem.price.toLocaleString()} VND</p>
            <p>Quantity: {cartItem.quantity}</p>
            <div className='flex gap-2 items-center'>
                <Link to={`/products/${cartItem.id}`}>View Details</Link>

            </div>
        </div>
    );
}

export default CartItemCard;