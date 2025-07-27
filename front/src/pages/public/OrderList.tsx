import type { Order } from "../../types"
import OrderCart from "../../components/order/OrderCart"
import { useQuery } from "@tanstack/react-query"
import { orderService } from "../../services/api"
import createReviewModal from "../../components/review/CreateReviewModal"
import { useState } from "react"

function OrderList() {
    const {data: orders, isLoading} = useQuery<Order[]>({  
        queryKey: ['order'],
        queryFn: () => orderService.getUserOrders()
    })
    
    if (isLoading) return <div>Loading...</div>;
    if (!orders?.length) return <div>Bạn chưa có đơn hàng nào</div>;
    
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Danh sách đơn hàng</h2>
            <div className="flex flex-wrap mx-4">
                {orders.map((order) => (
                    <div>
                        <OrderCart key={order.id} order={order} />

                    </div>
                ))}
            </div>

        </div>
    )
}

export default OrderList