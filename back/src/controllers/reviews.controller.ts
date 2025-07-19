import { Request, Response, NextFunction } from 'express';
import { reviewService } from '../services/reviews.service';
import createError from '../utils/errorHandler';

export const reviewController = {
  async getReviewsByProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = parseInt(req.params.productId);
      if (isNaN(productId)) return next(createError(400, 'Invalid product ID'));
      
      const { page = '1', limit = '10' } = req.query;
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      
      if (isNaN(pageNum) || pageNum < 1) return next(createError(400, 'Invalid page number'));
      if (isNaN(limitNum) || limitNum < 1) return next(createError(400, 'Invalid limit number'));
      
      const reviews = await reviewService.getReviewsByProduct(productId, {
        page: pageNum,
        limit: limitNum,
      });
      res.json(reviews);
    } catch (error: any) {
      next(createError(500, error.message));
    }
  },

  async getAllReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const { product_id, page = '1', limit = '10' } = req.query;
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      
      if (isNaN(pageNum) || pageNum < 1) return next(createError(400, 'Invalid page number'));
      if (isNaN(limitNum) || limitNum < 1) return next(createError(400, 'Invalid limit number'));
      
      const productIdNum = product_id ? parseInt(product_id as string) : undefined;
      if (product_id && isNaN(productIdNum!)) return next(createError(400, 'Invalid product ID'));
      
      const reviews = await reviewService.getAllReviews({
        product_id: productIdNum,
        page: pageNum,
        limit: limitNum,
      });
      res.json(reviews);
    } catch (error: any) {
      next(createError(500, error.message));
    }
  },

  async createReview(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return next(createError(401, 'User ID not found'));
      
      const { product_id, rating, comment } = req.body;
      if (!product_id || isNaN(product_id)) return next(createError(400, 'Invalid product ID'));
      if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
        return next(createError(400, 'Rating must be a number between 1 and 5'));
      }
      
      const review = await reviewService.createReview(parseInt(userId), { 
        product_id: parseInt(product_id), 
        rating: parseInt(rating), 
        comment: comment?.trim() 
      });
      res.status(201).json({ id: review.id, message: 'Review created successfully' });
    } catch (error: any) {
      next(createError(400, error.message));
    }
  },

  async updateReview(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return next(createError(401, 'User ID not found'));
      
      const reviewId = parseInt(req.params.id);
      if (isNaN(reviewId)) return next(createError(400, 'Invalid review ID'));
      
      const { rating, comment } = req.body;
      if (rating && (isNaN(rating) || rating < 1 || rating > 5)) {
        return next(createError(400, 'Rating must be a number between 1 and 5'));
      }
      
      await reviewService.updateReview(parseInt(userId), reviewId, { 
        rating: rating ? parseInt(rating) : undefined, 
        comment: comment?.trim() 
      });
      res.json({ message: 'Review updated successfully' });
    } catch (error: any) {
      next(createError(400, error.message));
    }
  },

  async deleteReview(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return next(createError(401, 'User ID not found'));
      
      const reviewId = parseInt(req.params.id);
      if (isNaN(reviewId)) return next(createError(400, 'Invalid review ID'));
      
      await reviewService.deleteReview(parseInt(userId), reviewId);
      res.json({ message: 'Review deleted successfully' });
    } catch (error: any) {
      next(createError(400, error.message));
    }
  },

  async adminDeleteReview(req: Request, res: Response, next: NextFunction) {
    try {
      const reviewId = parseInt(req.params.id);
      if (isNaN(reviewId)) return next(createError(400, 'Invalid review ID'));
      
      await reviewService.adminDeleteReview(reviewId);
      res.json({ message: 'Review deleted successfully by admin' });
    } catch (error: any) {
      next(createError(400, error.message));
    }
  },
};