// import { adminService } from '../../services/api';
// import type { Order } from '../../types';
// import UseCrud from '../../components/admin/common/UseCrud.tsx';

// function AdminOrders() {
//     const {
//         items: orders,
//         isLoading,
//         selectedItem: selectedOrder,
//         setSelectedItem: setSelectedOrder,
//         isModalOpen,
//         setIsModalOpen,
//         updateMutation
//       } = UseCrud<Order>(
//         'admin-orders',
//         () => adminService.getAllOrders(),
//         adminService.updateOrderStatus,
//         undefined,
//         undefined
//       );
// }