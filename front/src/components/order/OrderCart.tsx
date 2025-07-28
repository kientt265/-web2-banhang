import type { Order } from '../../types/index';
import OrderItemCart from './OrderItemCart'; // Assuming OrderItemCart is a valid React component or functional component with the OrderItemCartProps interface
import CreateReviewModal from '../review/CreateReviewModal'; // Assuming CreateReviewModal is a valid React component or functional component with the CreateReviewModalProps interface
import { useState } from 'react';
interface OrderCardProps {
    order: Order;
}

function OrderCart({ order }: OrderCardProps) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="product-card bg-gray-400 mx-2 rounded p-2 cursor-pointer">
            <p>OrderId: {order.id}</p>
            <p>Tổng tiền: {Number(order.total_amount).toLocaleString()} VND</p>
            <p>Trạng thái đơn hàng: {order.status}</p>
            <p>Trạng thái thanh toán: {order.payment_status}</p>
            <p>Địa chỉ giao hàng: {order.shipping_address}</p>
            <p>Số điện thoại giao hàng: {order.shipping_phone}</p>
            <p>Phương thức thanh toán: {order.payment_method}</p>
            <p>Ngày đặt hàng: {new Date(order.created_at).toLocaleDateString('vi-VN')}</p>
            {order.items?.map((orderItem) => (
                <div>
                    <OrderItemCart orderItem={orderItem} key={orderItem.id} />
                    {order.status === 'delivered' ? <CreateReviewModal product_id={orderItem.product_id} onClose={() => setIsOpen(false)} isOpen={isOpen}/> : null}
                </div>
            ))}
        </div>
    )
}

export default OrderCart;