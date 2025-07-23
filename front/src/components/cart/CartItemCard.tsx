import { Link } from 'react-router-dom';
import type { CartItem } from '../../types/index';
import DeleteItemButton from './DeleteItemButton';
import { cartService } from '../../services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';


interface CartItemProps {
    cartItem: CartItem;
}

function CartItemCard({ cartItem }: CartItemProps) {
    const queryClient = useQueryClient();

    const { mutate: deleteItem } = useMutation({
        mutationFn: () => cartService.deleteItem(cartItem.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            alert('Deleted from cart');
        },
        onError: (error: any) => {
            alert(error.message);
        }
    });



    return (

        <div className="product-card bg-gray-400 rounded p-2 cursor-pointer">
            <img src={cartItem.image_url || 'placeholder.jpg'} alt={cartItem.name} />
            <h3>{cartItem.name}</h3>
            <p>Price: {cartItem.price.toLocaleString()} VND</p>
            <p>Quantity: {cartItem.quantity}</p>
            <div className='flex gap-2 items-center'>
                <Link to={`/products/${cartItem.id}`}>View Details</Link>
            </div>
            <DeleteItemButton onDelete={() => deleteItem()} />
        </div>

    );
}

export default CartItemCard;