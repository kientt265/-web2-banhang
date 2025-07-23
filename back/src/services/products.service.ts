import {productModel} from '../models/products.model';

interface ProductFilter {
    category_id?: number;
    status?: string;
    page: number;
    limit: number;
  }
  
  interface ProductData {
    name: string;
    description?: string;
    price: number;
    stock_quantity: number;
    category_id?: number;
    image_url?: string;
    status?: 'active' | 'inactive' | 'out_of_stock';
  }

  export const productService = {
    async getAllProducts({ category_id, status, page, limit }: ProductFilter) {
        return await productModel.getAllProducts({ category_id, status, page, limit });
      },
    
      async getProductById(id: number) {
        const product = await productModel.getProductById(id);
        if (!product) throw new Error('Product not found');
        return product;
      },
    
      async createProduct(data: ProductData) {
        const { name, description, price, stock_quantity, category_id, image_url, status } = data;
        if (!name || !price || stock_quantity < 0) {
          throw new Error('Name, price, and valid stock quantity are required');
        }
        return await productModel.createProduct({
          name,
          description,
          price,
          stock_quantity,
          category_id,
          image_url,
          status: status || 'active',
        });
      },
    
      async updateProduct(id: number, data: Partial<ProductData>) {
        const product = await productModel.getProductById(id);
        if (!product) throw new Error('Product not found');
        await productModel.updateProduct(id, data);
      },
    
      async deleteProduct(id: number) {
        const product = await productModel.getProductById(id);
        if (!product) throw new Error('Product not found');
        await productModel.deleteProduct(id);
      },

  async getProductsByCategory({ categoryId, page, limit }: { categoryId: number; page: number; limit: number }) {
    if (!categoryId) throw new Error('Category ID is required');
    return await productModel.getAllProducts({ 
      category_id: categoryId,
      page,
      limit 
    });
  },
}