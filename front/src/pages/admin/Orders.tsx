import { adminService } from '../../services/api';
import type { Order } from '../../types';
import UseCrud from '../../components/admin/common/UseCrud.tsx';

function AdminOrders() {
    const {
        items: orders,
        isLoading,
        selectedItem: selectedOrder,
        setSelectedItem: setSelectedOrder,
        isModalOpen,
        setIsModalOpen
    } = UseCrud<Order>(
        'admin-orders',
        () => adminService.getAllOrders(),
        undefined,
        undefined,
        undefined
    );

    if (isLoading) return <div>Đang tải...</div>;
    console.log(orders);
    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Quản lý Orders</h1>
            </div>

            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">User Id</th>

                            <th className="py-3 px-6 text-left">Địa chỉ</th>
                            <th className="py-3 px-6 text-center">Tổng giá</th>
                            <th className="py-3 px-6 text-center">Trạng thái đơn hàng</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {orders?.map((order) => (
                            <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{order.id}</td>
                                <td className="py-3 px-6 text-left">{order.user_id}</td>

                                <td className="py-3 px-6 text-left">{order.shipping_address}</td>
                                <td className="py-3 px-6 text-left">{order.total_amount}</td>
                                <td className="py-3 px-6 text-left">{order.status}</td>
                                {/* <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                        <button
                                            onClick={() => {
                                                setSelectedOrder(order);
                                                setIsModalOpen(true);
                                            }}
                                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2"
                                        >
                                            Sửa
                                        </button>

                                    </div>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default AdminOrders;