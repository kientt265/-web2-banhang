import pool from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';


interface OrderItemData {
  product_id: number;
  quantity: number;
  price: number;
}

export const orderModel = {
  async getOrdersByUserId(userId: number, { status, page, limit }: { status?: string; page: number; limit: number }) {
    const offset = (page - 1) * limit;
    let query = `
      SELECT o.id, o.user_id, o.total_amount, o.status, o.shipping_address, o.shipping_phone,
             o.payment_method, o.payment_status, o.created_at, o.updated_at,
             oi.id as item_id, oi.product_id, oi.quantity, oi.price,
             p.name as product_name, p.image_url as product_image
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = ?`;
    
    const params: any[] = [userId];

    if (status) {
      query += ' AND o.status = ?';
      params.push(status);
    }

    query += ' ORDER BY o.created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await pool.query<RowDataPacket[]>(query, params);
    
    // Chuyển đổi kết quả phẳng thành cấu trúc phân cấp
    const orders = rows.reduce((acc: any[], row: any) => {
      let order = acc.find(o => o.id === row.id);
      if (!order) {
        order = {
          id: row.id,
          user_id: row.user_id,
          total_amount: row.total_amount,
          status: row.status,
          shipping_address: row.shipping_address,
          shipping_phone: row.shipping_phone,
          payment_method: row.payment_method,
          payment_status: row.payment_status,
          created_at: row.created_at,
          updated_at: row.updated_at,
          items: []
        };
        acc.push(order);
      }
      
      if (row.item_id) {
        order.items.push({
          id: row.item_id,
          product_id: row.product_id,
          quantity: row.quantity,
          unit_price: row.price,
          name: row.product_name,
          image_url: row.product_image
        });
      }
      
      return acc;
    }, []);

    return orders;
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
      'SELECT oi.id, oi.order_id, oi.product_id, oi.quantity, oi.price, p.name, p.image_url ' +
      'FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?',
      [orderId]
    );
    return rows;
  },

  async createOrder(userId: number, total_amount: number, shipping_address: string, shipping_phone: string, orderItems: OrderItemData[]) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [result] = await connection.query<ResultSetHeader[]>(
        'INSERT INTO orders (user_id, total_amount, shipping_address, shipping_phone) VALUES (?, ?, ?, ?)',
        [userId, total_amount, shipping_address, shipping_phone]
      );
      const orderId = (result as any).insertId;

      for (const item of orderItems) {
        await connection.query<ResultSetHeader[]>(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.product_id, item.quantity, item.price]
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

  async getOrderItemsByUserAndProduct(userId: number, productId: number) {
    const [rows] = await pool.query(
      'SELECT oi.id FROM order_items oi JOIN orders o ON oi.order_id = o.id WHERE o.user_id = ? AND oi.product_id = ?',
      [userId, productId]
    );
    return rows;
  },

  async getOrderItemsCompleted(userId: number, productId: number) {
    const [rows] = await pool.query(
      'SELECT oi.id FROM order_items oi JOIN orders o ON oi.order_id = o.id WHERE o.user_id =? AND oi.product_id =? AND o.status =?',
      [userId, productId, 'delivered']
    );
    return rows;
  },

  

  async updateOrderStatus(orderId: number, status: string) {
    await pool.query<ResultSetHeader[]>('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
  },
};