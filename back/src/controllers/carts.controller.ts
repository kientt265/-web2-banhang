import { Request, Response, NextFunction } from 'express';
import { cartService } from '../services/carts.service';
import createError from '../utils/errorHandler';

export const cartController = {
  async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId; // Sửa từ req.user.id thành req.user?.userId
      if (!userId) return next(createError(401, 'User ID not found'));
      const cart = await cartService.getCart(parseInt(userId));
      res.json(cart);
    } catch (error: any) {
      next(createError(500, error.message));
    }
  },

  async addCartItem(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return next(createError(401, 'User ID not found'));
      
      const { product_id, quantity } = req.body;
      if (!product_id) return next(createError(400, 'Product ID is required'));
      if (!quantity || quantity < 1) return next(createError(400, 'Quantity must be greater than 0'));
      
      const cartItemId = await cartService.addCartItem(parseInt(userId), { product_id, quantity });
      res.status(201).json({ id: cartItemId, message: 'Item added to cart' });
    } catch (error: any) {
      next(createError(400, error.message));
    }
  },

  async updateCartItem(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return next(createError(401, 'User ID not found'));
      
      const itemId = parseInt(req.params.itemId);
      if (isNaN(itemId)) return next(createError(400, 'Invalid item ID'));
      
      const { quantity } = req.body;
      if (!quantity || quantity < 0) return next(createError(400, 'Quantity must be greater than or equal to 0'));
      
      await cartService.updateCartItem(parseInt(userId), itemId, quantity);
      res.json({ message: 'Cart item updated successfully' });
    } catch (error: any) {
      next(createError(400, error.message));
    }
  },

  async deleteCartItem(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return next(createError(401, 'User ID not found'));
      
      const itemId = parseInt(req.params.itemId);
      if (isNaN(itemId)) return next(createError(400, 'Invalid item ID'));
      
      await cartService.deleteCartItem(parseInt(userId), itemId);
      res.json({ message: 'Cart item deleted successfully' });
    } catch (error: any) {
      next(createError(400, error.message));
    }
  },

  async clearCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return next(createError(401, 'User ID not found'));
      await cartService.clearCart(parseInt(userId));
      res.json({ message: 'Cart cleared successfully' });
    } catch (error: any) {
      next(createError(400, error.message));
    }
  },
};