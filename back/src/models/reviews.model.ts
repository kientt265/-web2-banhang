import pool from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

interface ReviewData {
  user_id: number;
  product_id: number;
  rating: number;
  comment?: string;
}

export const reviewModel = {
  async getReviewsByProduct(productId: number, { page, limit }: { page: number; limit: number }) {
    const offset = (page - 1) * limit;
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT r.id, r.user_id, r.product_id, r.rating, r.comment, r.created_at, r.updated_at, u.username ' +
      'FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.product_id = ? LIMIT ? OFFSET ?',
      [productId, limit, offset]
    );
    return rows;
  },

  async getAllReviews({ product_id, page, limit }: { product_id?: number; page: number; limit: number }) {
    const offset = (page - 1) * limit;
    let query = 'SELECT r.id, r.user_id, r.product_id, r.rating, r.comment, r.created_at, r.updated_at, u.username ' +
                'FROM reviews r JOIN users u ON r.user_id = u.id WHERE 1=1';
    const params: any[] = [];

    if (product_id) {
      query += ' AND r.product_id = ?';
      params.push(product_id);
    }

    query += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await pool.query<RowDataPacket[]>(query, params);
    return rows;
  },

  async getReviewById(id: number) {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id, user_id, product_id, rating, comment, created_at, updated_at FROM reviews WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  async getReviewByUserAndProduct(userId: number, productId: number) {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id, user_id, product_id, rating, comment FROM reviews WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
    return rows[0];
  },

  async createReview({ user_id, product_id, rating, comment }: ReviewData) {
    const [result] = await pool.query<ResultSetHeader[]>(
      'INSERT INTO reviews (user_id, product_id, rating, comment) VALUES (?, ?, ?, ?)',
      [user_id, product_id, rating, comment]
    );
    return { id: (result as any).insertId };
  },

  async updateReview(id: number, { rating, comment }: Partial<ReviewData>) {
    const fields: string[] = [];
    const values: any[] = [];
    if (rating !== undefined) { fields.push('rating = ?'); values.push(rating); }
    if (comment !== undefined) { fields.push('comment = ?'); values.push(comment); }

    if (fields.length === 0) return;
    values.push(id);
    await pool.query<ResultSetHeader[]>(`UPDATE reviews SET ${fields.join(', ')} WHERE id = ?`, values);
  },

  async deleteReview(id: number) {
    await pool.query<ResultSetHeader[]>('DELETE FROM reviews WHERE id = ?', [id]);
  },
};