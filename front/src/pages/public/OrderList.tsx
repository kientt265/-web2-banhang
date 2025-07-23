import type { Order } from "../../types"
import OrderItemCard from "../../components/order/OrderItemCard"
import { useQuery } from "@tanstack/react-query"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from "../../services/api"

function OrderList() {
    const {data: orders, isLoading} = useQuery<Order>({
        queryKey: ['order'],
        queryFn: () => orderService.getUserOrders()
    })
    if (isLoading) return <div>Loading...</div>;
    return (
        <div>
            <div className="flex flex-wrap mx-4">
                {orders?.items?.map((order)=> (
                    <div key={order.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-6">
                    <OrderItemCard orderItem={order} />
                  </div>
                ))}
            </div>
        </div>
    )
}

export default OrderList