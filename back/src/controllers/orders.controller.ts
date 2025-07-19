import { Request, Response, NextFunction } from 'express';
import { orderService } from '../services/orders.service';
import createError from '../utils/errorHandler';

export const orderController = {
  async getUserOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { status, page = '1', limit = '10' } = req.query;
      const orders = await orderService.getUserOrders(userId, {
        status: status as string,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
      });
      res.json(orders);
    } catch (error: any) {
      next(createError(500, error.message));
    }
  },

  async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const orderId = parseInt(req.params.id);
      const order = await orderService.getOrderById(userId, orderId);
      if (!order) return next(createError(404, 'Order not found'));
      res.json(order);
    } catch (error: any) {
      next(createError(500, error.message));
    }
  },

  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { shipping_address } = req.body;
      const order = await orderService.createOrder(userId, shipping_address);
      res.status(201).json({ id: order.id, message: 'Order created successfully' });
    } catch (error: any) {
      next(createError(400, error.message));
    }
  },

  async cancelOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const orderId = parseInt(req.params.id);
      await orderService.cancelOrder(userId, orderId);
      res.json({ message: 'Order cancelled successfully' });
    } catch (error: any) {
      next(createError(400, error.message));
    }
  },

  async getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, page = '1', limit = '10' } = req.query;
      const orders = await orderService.getAllOrders({
        status: status as string,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
      });
      res.json(orders);
    } catch (error: any) {
      next(createError(500, error.message));
    }
  },

  async updateOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = parseInt(req.params.id);
      const { status } = req.body;
      await orderService.updateOrderStatus(orderId, status);
      res.json({ message: 'Order status updated successfully' });
    } catch (error: any) {
      next(createError(400, error.message));
    }
  },
};