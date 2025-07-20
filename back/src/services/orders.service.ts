import { cartModel } from '../models/carts.model';
import { productModel } from '../models/products.model';
import { orderModel } from '../models/orders.model';

interface OrderFilter {
  status?: string;
  page: number;
  limit: number;
}

export const orderService = {
  async getUserOrders(userId: number, { status, page, limit }: OrderFilter) {
    return await orderModel.getOrdersByUserId(userId, { status, page, limit });
  },

  async getOrderById(userId: number, orderId: number) {
    const order = await orderModel.getOrderById(orderId);
    if (!order || order.user_id !== userId) throw new Error('Order not found or access denied');
    return order;
  },

  async createOrder(userId: number, shipping_address: string, shipping_phone: string) {
    if (!shipping_address) throw new Error('Shipping address is required');
    if (!shipping_phone) throw new Error('Shipping phone is required');

    const cart = await cartModel.getCartByUserId(userId);
    if (!cart) throw new Error('Cart is empty');
    const cartItems = await cartModel.getCartItems(cart.id);
    if (!cartItems.length) throw new Error('Cart is empty');

    let total_amount = 0;
    const orderItems: { product_id: number; quantity: number; price: number }[] = [];

    for (const item of cartItems) {
      const product = await productModel.getProductById(item.product_id);
      if (!product) throw new Error(`Product ID ${item.product_id} not found`);
      if (product.stock_quantity < item.quantity) throw new Error(`Insufficient stock for product ${product.name}`);
      if (product.status !== 'active') throw new Error(`Product ${product.name} is not available`);

      total_amount += product.price * item.quantity;
      orderItems.push({ product_id: item.product_id, quantity: item.quantity, price: product.price });
    }

    const order = await orderModel.createOrder(userId, total_amount, shipping_address, shipping_phone, orderItems);

    // Cập nhật số lượng tồn kho
    for (const item of cartItems) {
      await productModel.updateProduct(item.product_id, { stock_quantity: (await productModel.getProductById(item.product_id)).stock_quantity - item.quantity });
    }

    // Xóa giỏ hàng sau khi tạo đơn hàng
    await cartModel.clearCart(cart.id);

    return order;
  },

  async cancelOrder(userId: number, orderId: number) {
    const order = await orderModel.getOrderById(orderId);
    if (!order || order.user_id !== userId) throw new Error('Order not found or access denied');
    if (order.status !== 'pending') throw new Error('Only pending orders can be cancelled');

    await orderModel.updateOrderStatus(orderId, 'cancelled');

    // Hoàn lại số lượng tồn kho
    const orderItems = await orderModel.getOrderItems(orderId);
    for (const item of orderItems) {
      const product = await productModel.getProductById(item.product_id);
      await productModel.updateProduct(item.product_id, { stock_quantity: product.stock_quantity + item.quantity });
    }
  },

  async getAllOrders({ status, page, limit }: OrderFilter) {
    return await orderModel.getAllOrders({ status, page, limit });
  },

  async updateOrderStatus(orderId: number, status: string) {
    const order = await orderModel.getOrderById(orderId);
    if (!order) throw new Error('Order not found');
    await orderModel.updateOrderStatus(orderId, status);
  },
};