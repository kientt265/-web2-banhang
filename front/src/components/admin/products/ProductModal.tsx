import { useState, useEffect } from 'react';
import type { Product } from '../../../types';
import type { Category } from '../../../types';
import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../../../services/api';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onSubmit: (data: Partial<Product>) => void;
}

function ProductModal({ product, onClose, onSubmit }: ProductModalProps) {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    stock_quantity: 0,
    status: 'active',
    category_id: 0,
    image_url: ''
  });
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAll(),
  })
  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { id, created_at, updated_at, ...submitData } = formData;
    onSubmit(submitData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mô tả</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Giá</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Loại sản phẩm</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500" name="" id="" onChange={(e) => {
              const selectedCategoryId = e.target.value;
              if (selectedCategoryId) {
                setFormData({ ...formData, category_id: Number(selectedCategoryId) });
              }
            }}>


              {categories?.map((category) => (
                <option className='cursor-pointer' value={category.id}>{category.name}</option>
              ))}
              <option className='cursor-pointer bg-blue-500' value="">Thêm loại sản phẩm</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Số lượng</label>
            <input
              type="number"
              value={formData.stock_quantity}
              onChange={(e) => setFormData({ ...formData, stock_quantity: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Product['status'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
            >
              <option value="active">Đang bán</option>
              <option value="inactive">Ngừng bán</option>
              <option value="out_of_stock">Hết hàng</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">URL Hình ảnh</label>
            <input
              type="text"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {product ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;