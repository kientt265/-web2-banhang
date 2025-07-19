import pool from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

interface CartItemData {
  cart_id: number;
  product_id: number;
  quantity: number;
}

export const cartModel = {
  async getCartByUserId(userId: number) {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT id, user_id, created_at, updated_at FROM carts WHERE user_id = ?', [userId]);
    return rows[0];
  },

  async createCart(userId: number) {
    const [result] = await pool.query<ResultSetHeader[]>('INSERT INTO carts (user_id) VALUES (?)', [userId]);
    return { id: (result as any).insertId, user_id: userId };
  },

  async getCartItems(cartId: number) {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT ci.id, ci.cart_id, ci.product_id, ci.quantity, p.name, p.price, p.image_url ' +
      'FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.cart_id = ?',
      [cartId]
    );
    return rows;
  },

  async getCartItemByProductId(cartId: number, productId: number) {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT id, cart_id, product_id, quantity FROM cart_items WHERE cart_id = ? AND product_id = ?', [cartId, productId]);
    return rows[0];
  },

  async getCartItemById(itemId: number) {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT id, cart_id, product_id, quantity FROM cart_items WHERE id = ?', [itemId]);
    return rows[0];
  },

  async addCartItem(cartId: number, productId: number, quantity: number) {
    const [result] = await pool.query<ResultSetHeader[]>('INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)', [cartId, productId, quantity]);
    return { id: (result as any).insertId };
  },

  async updateCartItem(itemId: number, quantity: number) {
    await pool.query<ResultSetHeader[]>('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, itemId]);
  },

  async deleteCartItem(itemId: number) {
    await pool.query<ResultSetHeader[]>('DELETE FROM cart_items WHERE id = ?', [itemId]);
  },

  async clearCart(cartId: number) {
    await pool.query<ResultSetHeader[]>('DELETE FROM cart_items WHERE cart_id = ?', [cartId]);
    await pool.query<ResultSetHeader[]>('DELETE FROM carts WHERE id = ?', [cartId]);
  },
};