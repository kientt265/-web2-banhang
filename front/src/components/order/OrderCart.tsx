import type { Order } from '../../types/index';
import OrderItemCart from './OrderItemCart';
import CreateReviewModal from '../review/CreateReviewModal';
import { useState } from 'react';

interface OrderCardProps {
    order: Order;
}

function OrderCart({ order }: OrderCardProps) {
    const [openReviewModal, setOpenReviewModal] = useState<number | null>(null);

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
                <div key={`order-item-${orderItem.id}`}>
                    <OrderItemCart orderItem={orderItem} />
                    {order.status === 'delivered' && (
                        <CreateReviewModal 
                            product_id={orderItem.product_id}
                            onClose={() => setOpenReviewModal(null)}
                            isOpen={openReviewModal === orderItem.id}
                        />
                    )}
                    {order.status === 'delivered' && (
                        <button 
                            onClick={() => setOpenReviewModal(orderItem.id)}
                            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Đánh giá sản phẩm
                        </button>
                    )}
                </div>
            ))}
        </div>
    )
}

export default OrderCart;