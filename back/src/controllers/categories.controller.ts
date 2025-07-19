import { Request, Response, NextFunction } from 'express';
import { categoryService } from '../services/categories.service';
import  createError  from '../utils/errorHandler';

export const categoryController = {
  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const { parent_id, page = '1', limit = '10' } = req.query;
      const categories = await categoryService.getAllCategories({
        parent_id: parent_id ? parseInt(parent_id as string) : undefined,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
      });
      res.json(categories);
    } catch (error: any) {
      next(createError(500, error.message));
    }
  },

  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categoryService.getCategoryById(parseInt(req.params.id));
      if (!category) return next(createError(404, 'Category not found'));
      res.json(category);
    } catch (error: any) {
      next(createError(500, error.message));
    }
  },

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categoryService.createCategory(req.body);
      res.status(201).json({ id: category.id, message: 'Category created successfully' });
    } catch (error: any) {
      next(createError(400, error.message));
    }
  },

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      await categoryService.updateCategory(parseInt(req.params.id), req.body);
      res.json({ message: 'Category updated successfully' });
    } catch (error: any) {
      next(createError(400, error.message));
    }
  },

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      await categoryService.deleteCategory(parseInt(req.params.id));
      res.json({ message: 'Category deleted successfully' });
    } catch (error: any) {
      next(createError(400, error.message));
    }
  },
};