import { categoryModel } from '../models/categories.model';

interface CategoryFilter {
  parent_id?: number;
  page: number;
  limit: number;
}

interface CategoryData {
  name: string;
  description?: string;
  parent_id?: number;
}

export const categoryService = {
  async getAllCategories({ parent_id, page, limit }: CategoryFilter) {
    return await categoryModel.getAllCategories({ parent_id, page, limit });
  },

  async getCategoryById(id: number) {
    const category = await categoryModel.getCategoryById(id);
    if (!category) throw new Error('Category not found');
    return category;
  },

  async createCategory(data: CategoryData) {
    const { name, description, parent_id } = data;
    if (!name) throw new Error('Name is required');
    if (parent_id) {
      const parent = await categoryModel.getCategoryById(parent_id);
      if (!parent) throw new Error('Parent category not found');
    }
    return await categoryModel.createCategory({ name, description, parent_id });
  },

  async updateCategory(id: number, data: Partial<CategoryData>) {
    const category = await categoryModel.getCategoryById(id);
    if (!category) throw new Error('Category not found');
    if (data.parent_id) {
      const parent = await categoryModel.getCategoryById(data.parent_id);
      if (!parent) throw new Error('Parent category not found');
      if (data.parent_id === id) throw new Error('Category cannot be its own parent');
    }
    await categoryModel.updateCategory(id, data);
  },

  async deleteCategory(id: number) {
    const category = await categoryModel.getCategoryById(id);
    if (!category) throw new Error('Category not found');
    const hasChildren = await categoryModel.hasChildCategories(id);
    const hasProducts = await categoryModel.hasProducts(id);
    if (hasChildren || hasProducts) {
      throw new Error('Cannot delete category with subcategories or products');
    }
    await categoryModel.deleteCategory(id);
  },
};