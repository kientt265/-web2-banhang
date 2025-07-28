import { adminService } from '../../services/api';
import ProductModal from '../../components/admin/products/ProductModal';
import type { Product } from '../../types';
import UseCrud from '../../components/admin/common/UseCrud.tsx';
function AdminProducts() {
  const {
    items: products,
    isLoading,
    selectedItem: selectedProduct,
    setSelectedItem: setSelectedProduct,
    isModalOpen,
    setIsModalOpen,
    createMutation,
    updateMutation,
    handleDelete,
  } = UseCrud<Product>(
    'admin-products',
    () => adminService.getAll(),
    adminService.updateProduct,
    adminService.deleteProduct,
    adminService.createProduct
  );

  if (isLoading) return <div>Đang tải...</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <button
          onClick={() => {
            setSelectedProduct(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Thêm sản phẩm mới
        </button>
      </div>

      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Tên sản phẩm</th>
              <th className="py-3 px-6 text-left">Giá</th>
              <th className="py-3 px-6 text-left">Số lượng</th>
              <th className="py-3 px-6 text-left">Trạng thái</th>
              <th className="py-3 px-6 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {products?.map((product) => (
              <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{product.id}</td>
                <td className="py-3 px-6 text-left">{product.name}</td>
                <td className="py-3 px-6 text-left">{product.price.toLocaleString()} VND</td>
                <td className="py-3 px-6 text-left">{product.stock_quantity}</td>
                <td className="py-3 px-6 text-left">{product.status}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsModalOpen(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(data) => {
            if (selectedProduct) {
              updateMutation.mutate({ id: selectedProduct.id, data });
            } else {
              createMutation.mutate(data);
            }
          }}
        />
      )}
    </div>
  );
}

export default AdminProducts;