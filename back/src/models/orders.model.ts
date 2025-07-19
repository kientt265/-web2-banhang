import pool from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';


interface OrderItemData {
  product_id: number;
  quantity: number;
  unit_price: number;
}

export const orderModel = {
  async getOrdersByUserId(userId: number, { status, page, limit }: { status?: string; page: number; limit: number }) {
    const offset = (page - 1) * limit;
    let query = 'SELECT id, user_id, total_amount, status, shipping_address, created_at, updated_at FROM orders WHERE user_id = ?';
    const params: any[] = [userId];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await pool.query<RowDataPacket[]>(query, params);
    return rows;
  },

  async getAllOrders({ status, page, limit }: { status?: string; page: number; limit: number }) {
    const offset = (page - 1) * limit;
    let query = 'SELECT id, user_id, total_amount, status, shipping_address, created_at, updated_at FROM orders WHERE 1=1';
    const params: any[] = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await pool.query<RowDataPacket[]>(query, params);
    return rows;
  },

  async getOrderById(id: number) {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id, user_id, total_amount, status, shipping_address, created_at, updated_at FROM orders WHERE id = ?',
      [id]
    );
    if (!rows[0]) return null;
    const order = rows[0];
    order.items = await this.getOrderItems(id);
    return order;
  },

  async getOrderItems(orderId: number) {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT oi.id, oi.order_id, oi.product_id, oi.quantity, oi.unit_price, p.name, p.image_url ' +
      'FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?',
      [orderId]
    );
    return rows;
  },

  async createOrder(userId: number, total_amount: number, shipping_address: string, orderItems: OrderItemData[]) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [result] = await connection.query<ResultSetHeader[]>(
        'INSERT INTO orders (user_id, total_amount, shipping_address) VALUES (?, ?, ?)',
        [userId, total_amount, shipping_address]
      );
      const orderId = (result as any).insertId;

      for (const item of orderItems) {
        await connection.query<ResultSetHeader[]>(
          'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
          [orderId, item.product_id, item.quantity, item.unit_price]
        );
      }

      await connection.commit();
      return { id: orderId };
    } catch (error: any) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  async updateOrderStatus(orderId: number, status: string) {
    await pool.query<ResultSetHeader[]>('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
  },
};