import pool from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

interface CategoryData {
  name: string;
  description?: string;
  parent_id?: number;
}

export const categoryModel = {
  async getAllCategories({ parent_id, page, limit }: { parent_id?: number; page: number; limit: number }) {
    const offset = (page - 1) * limit;
    let query = 'SELECT id, name, description, parent_id FROM categories WHERE 1=1';
    const params: any[] = [];

    if (parent_id) {
      query += ' AND parent_id = ?';
      params.push(parent_id);
    } else if (parent_id === null) {
      query += ' AND parent_id IS NULL';
    }

    query += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await pool.query<RowDataPacket[]>(query, params);
    return rows;
  },

  async getCategoryById(id: number) {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id, name, description, parent_id FROM categories WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  async createCategory({ name, description, parent_id }: CategoryData) {
    const [result] = await pool.query<ResultSetHeader[]>(
      'INSERT INTO categories (name, description, parent_id) VALUES (?, ?, ?)',
      [name, description, parent_id]
    );
    return { id: (result as any).insertId };
  },

  async updateCategory(id: number, data: Partial<CategoryData>) {
    const fields: string[] = [];
    const values: any[] = [];
    if (data.name) { fields.push('name = ?'); values.push(data.name); }
    if (data.description !== undefined) { fields.push('description = ?'); values.push(data.description); }
    if (data.parent_id !== undefined) { fields.push('parent_id = ?'); values.push(data.parent_id); }

    if (fields.length === 0) return;
    values.push(id);
    await pool.query<ResultSetHeader[]>(`UPDATE categories SET ${fields.join(', ')} WHERE id = ?`, values);
  },

  async deleteCategory(id: number) {
    await pool.query<ResultSetHeader[]>('DELETE FROM categories WHERE id = ?', [id]);
  },

  async hasChildCategories(id: number) {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT COUNT(*) as count FROM categories WHERE parent_id = ?', [id]);
    return rows[0].count > 0;
  },

  async hasProducts(id: number) {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT COUNT(*) as count FROM products WHERE category_id = ?', [id]);
    return rows[0].count > 0;
  },
};