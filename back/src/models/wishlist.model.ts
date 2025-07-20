import pool from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export const wishlistModel = {
  async getWishlistByUserId(userId: number) {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT w.id, w.user_id, w.product_id, p.name, p.price, p.image_url, p.status ' +
      'FROM wishlist w JOIN products p ON w.product_id = p.id WHERE w.user_id = ?',
      [userId]
    );
    return rows;
  },

  async getWishlistItemByUserAndProduct(userId: number, productId: number) {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id, user_id, product_id FROM wishlist WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
    return rows[0];
  },

  async addWishlistItem(userId: number, productId: number) {
    const [result] = await pool.query<ResultSetHeader[]>(
      'INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)',
      [userId, productId]
    );
    return { id: (result as any).insertId };
  },

  async deleteWishlistItem(userId: number, productId: number) {
    await pool.query<ResultSetHeader[]>('DELETE FROM wishlist WHERE user_id = ? AND product_id = ?', [userId, productId]);
  },

  async clearWishlist(userId: number) {
    await pool.query<ResultSetHeader[]>('DELETE FROM wishlist WHERE user_id = ?', [userId]);
  },
};