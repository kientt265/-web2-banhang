import { Request, Response, NextFunction } from 'express';
import { productService } from '../services/products.service';
import  createError  from '../utils/errorHandler';

export const productController = {
  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { category_id, status, page = '1', limit = '10' } = req.query;
      const products = await productService.getAllProducts({
        category_id: category_id ? parseInt(category_id as string) : undefined,
        status: status as string,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
      });
      res.json(products);
    } catch (error: any) {
      next(createError(500, error.message));
    }
  },

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.getProductById(parseInt(req.params.id));
      if (!product) return next(createError(404, 'Product not found'));
      res.json(product);
    } catch (error: any) {
      next(createError(500, error.message));
    }
  },

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json({ id: product.id, message: 'Product created successfully' });
    } catch (error: any) {
      next(createError(400, error.message));
    }
  },

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      await productService.updateProduct(parseInt(req.params.id), req.body);
      res.json({ message: 'Product updated successfully' });
    } catch (error: any) {
      next(createError(400, error.message));
    }
  },

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      await productService.deleteProduct(parseInt(req.params.id));
      res.json({ message: 'Product deleted successfully' });
    } catch (error: any) {
      next(createError(400, error.message));
    }
  },
};