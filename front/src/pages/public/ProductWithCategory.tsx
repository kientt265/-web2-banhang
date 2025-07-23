import { productService } from '../../services/api';
import type { Product } from '../../types';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../../components/product/ProductCard.tsx';

function ProductWithCategory() {
  const { id } = useParams();
  const categoryId = id ? parseInt(id) : undefined;

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery<Product[], Error>({
    queryKey: ['products', categoryId],
    queryFn: () =>
      categoryId
        ? productService.getByCategory(categoryId)
        : Promise.reject(new Error('Category ID is missing')),
    enabled: !!categoryId,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    return (
      <div className="text-red-600 p-4">
        ❌ Lỗi khi tải sản phẩm: {error.message}
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex flex-wrap -mx-4">
        {products?.map((product) => (
          <div
            key={product.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-6"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductWithCategory;
