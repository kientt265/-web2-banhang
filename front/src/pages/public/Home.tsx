import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/api';
import type { Product } from '../../types';
import ProductCard from '../../components/product/ProductCard.tsx';

function Home() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => productService.getAll({ page: 1, limit: 10 }),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex flex-wrap -mx-4">
        {products?.map((product) => (
          <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-6">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}


export default Home;