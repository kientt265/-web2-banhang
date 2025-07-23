import type { OrderItem } from '../../types/index';
import { Link } from 'react-router-dom';
interface OrderItemCardProps {
    orderItem: OrderItem;
}

function OrderItemCard({orderItem}: OrderItemCardProps) {
    return (
        <div className="product-card bg-gray-400 rounded p-2 cursor-pointer">
            <img src={orderItem.image_url || 'placeholder.jpg'} alt={orderItem.name} />
            <h3>{orderItem.name}</h3>
            <p>Price: {orderItem.unit_price.toLocaleString()} VND</p>
            <p>Quantity: {orderItem.quantity}</p>
            <div className='flex gap-2 items-center'>
                <Link to={`/products/${orderItem.id}`}>View Details</Link>
            </div>

        </div>
    )
}

export default OrderItemCard;