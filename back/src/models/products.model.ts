import pool from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

interface ProductData {
  name: string;
  description?: string;
  price: number;
  stock_quantity: number;
  category_id?: number;
  image_url?: string;
  status?: string;
}

export const productModel = {
  async getAllProducts({ category_id, status, page, limit }: { category_id?: number; status?: string; page: number; limit: number }) {
    const offset = (page - 1) * limit;
    let query = 'SELECT id, name, description, price, stock_quantity, category_id, image_url, status, created_at, updated_at FROM products WHERE 1=1';
    const params: any[] = [];

    if (category_id) {
      query += ' AND category_id = ?';
      params.push(category_id);
    }
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await pool.query<ResultSetHeader[]>(query, params);
    return rows;
  },

  async getProductById(id: number) {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id, name, description, price, stock_quantity, category_id, image_url, status, created_at, updated_at FROM products WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  async createProduct({ name, description, price, stock_quantity, category_id, image_url, status }: ProductData) {
    const [result] = await pool.query<ResultSetHeader[]>(
      'INSERT INTO products (name, description, price, stock_quantity, category_id, image_url, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, description, price, stock_quantity, category_id, image_url, status]
    );
    return { id: (result as any).insertId };
  },

  async updateProduct(id: number, data: Partial<ProductData>) {
    const fields: string[] = [];
    const values: any[] = [];
    if (data.name) { fields.push('name = ?'); values.push(data.name); }
    if (data.description !== undefined) { fields.push('description = ?'); values.push(data.description); }
    if (data.price) { fields.push('price = ?'); values.push(data.price); }
    if (data.stock_quantity !== undefined) { fields.push('stock_quantity = ?'); values.push(data.stock_quantity); }
    if (data.category_id !== undefined) { fields.push('category_id = ?'); values.push(data.category_id); }
    if (data.image_url !== undefined) { fields.push('image_url = ?'); values.push(data.image_url); }
    if (data.status) { fields.push('status = ?'); values.push(data.status); }

    if (fields.length === 0) return;
    values.push(id);
    await pool.query<ResultSetHeader[]>(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`, values);
  },

  async deleteProduct(id: number) {
    await pool.query<ResultSetHeader[]>('DELETE FROM products WHERE id = ?', [id]);
  },
};