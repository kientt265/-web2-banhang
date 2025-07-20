import { Request, Response, NextFunction } from 'express';
import { wishlistService } from '../services/wishlist.service';
import createError from '../utils/errorHandler';

export const wishlistController = {
  async getWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return next(createError(401, 'User ID not found'));
      
      const wishlist = await wishlistService.getWishlist(parseInt(userId));
      res.json(wishlist);
    } catch (error: any) {
      next(createError(500, error.message));
    }
  },

  async addWishlistItem(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return next(createError(401, 'User ID not found'));
      
      const { product_id } = req.body;
      if (!product_id || isNaN(product_id)) {
        return next(createError(400, 'Valid product ID is required'));
      }
      
      const wishlistItem = await wishlistService.addWishlistItem(parseInt(userId), parseInt(product_id));
      res.status(201).json({ id: wishlistItem.id, message: 'Item added to wishlist' });
    } catch (error: any) {
      next(createError(400, error.message));
    }
  },

  async deleteWishlistItem(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return next(createError(401, 'User ID not found'));
      
      const productId = parseInt(req.params.productId);
      if (isNaN(productId)) {
        return next(createError(400, 'Invalid product ID'));
      }
      
      await wishlistService.deleteWishlistItem(parseInt(userId), productId);
      res.json({ message: 'Item removed from wishlist' });
    } catch (error: any) {
      next(createError(400, error.message));
    }
  },

  async clearWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return next(createError(401, 'User ID not found'));
      
      await wishlistService.clearWishlist(parseInt(userId));
      res.json({ message: 'Wishlist cleared successfully' });
    } catch (error: any) {
      next(createError(400, error.message));
    }
  },
};