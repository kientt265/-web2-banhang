import { Request, Response, NextFunction } from 'express';
import { orderService } from '../services/orders.service';
import createError from '../utils/errorHandler';

export const orderController = {
  async getUserOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return next(createError(401, 'User ID not found'));
      
      const { status, page = '1', limit = '10' } = req.query;
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      
      if (isNaN(pageNum) || pageNum < 1) return next(createError(400, 'Invalid page number'));
      if (isNaN(limitNum) || limitNum < 1) return next(createError(400, 'Invalid limit number'));
      
      const orders = await orderService.getUserOrders(parseInt(userId), {
        status: status as string,
        page: pageNum,
        limit: limitNum,
      });
      res.json(orders);
    } catch (error: any) {
      next(createError(500, error.message));
    }
  },

  async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return next(createError(401, 'User ID not found'));
      
      const orderId = parseInt(req.params.id);
      if (isNaN(orderId)) return next(createError(400, 'Invalid order ID'));
      
      const order = await orderService.getOrderById(parseInt(userId), orderId);
      if (!order) return next(createError(404, 'Order not found'));
      res.json(order);
    } catch (error: any) {
      next(createError(500, error.message));
    }
  },

  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return next(createError(401, 'User ID not found'));
      
      const { shipping_address, shipping_phone } = req.body;
      if (!shipping_address || typeof shipping_address !== 'string' || shipping_address.trim().length === 0) {
        return next(createError(400, 'Valid shipping address is required'));
      }
      if (!shipping_phone || typeof shipping_phone !== 'string' || shipping_phone.trim().length === 0) {
        return next(createError(400, 'Valid shipping phone is required'));
      }
      
      const order = await orderService.createOrder(parseInt(userId), shipping_address.trim(), shipping_phone.trim());
      res.status(201).json({ id: order.id, message: 'Order created successfully' });
    } catch (error: any) {
      next(createError(400, error.message));
    }
  },

  async cancelOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return next(createError(401, 'User ID not found'));
      
      const orderId = parseInt(req.params.id);
      if (isNaN(orderId)) return next(createError(400, 'Invalid order ID'));
      
      await orderService.cancelOrder(parseInt(userId), orderId);
      res.json({ message: 'Order cancelled successfully' });
    } catch (error: any) {
      next(createError(400, error.message));
    }
  },

  async getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, page = '1', limit = '10' } = req.query;
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      
      if (isNaN(pageNum) || pageNum < 1) return next(createError(400, 'Invalid page number'));
      if (isNaN(limitNum) || limitNum < 1) return next(createError(400, 'Invalid limit number'));
      
      const orders = await orderService.getAllOrders({
        status: status as string,
        page: pageNum,
        limit: limitNum,
      });
      res.json(orders);
    } catch (error: any) {
      next(createError(500, error.message));
    }
  },

  async updateOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = parseInt(req.params.id);
      if (isNaN(orderId)) return next(createError(400, 'Invalid order ID'));
      
      const { status } = req.body;
      if (!status || typeof status !== 'string' || !['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
        return next(createError(400, 'Invalid order status'));
      }
      
      await orderService.updateOrderStatus(orderId, status);
      res.json({ message: 'Order status updated successfully' });
    } catch (error: any) {
      next(createError(400, error.message));
    }
  },
};