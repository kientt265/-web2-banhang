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
    <div>
      <h1>Products</h1>
      <div className="product-list">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;