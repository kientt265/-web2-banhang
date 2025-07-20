import { reviewModel } from '../models/reviews.model';
import { productModel } from '../models/products.model';
import { orderModel } from '../models/orders.model';

interface ReviewFilter {
  product_id?: number;
  page: number;
  limit: number;
}

interface ReviewData {
  product_id: number;
  rating: number;
  comment?: string;
}

export const reviewService = {
  async getReviewsByProduct(productId: number, { page, limit }: { page: number; limit: number }) {
    const product = await productModel.getProductById(productId);
    if (!product) throw new Error('Product not found');
    return await reviewModel.getReviewsByProduct(productId, { page, limit });
  },

  async getAllReviews({ product_id, page, limit }: ReviewFilter) {
    return await reviewModel.getAllReviews({ product_id, page, limit });
  },

  async createReview(userId: number, { product_id, rating, comment }: ReviewData) {
    if (!product_id) throw new Error('Product ID is required');
    if (!rating || rating < 1 || rating > 5) throw new Error('Rating must be between 1 and 5');
    
    const product = await productModel.getProductById(product_id);
    if (!product) throw new Error('Product not found');
    if (product.status !== 'active') throw new Error('Cannot review inactive product');

    // Kiểm tra xem người dùng đã mua sản phẩm chưa
    const hasPurchased = await orderModel.getOrderItemsCompleted(userId, product_id);
    if (!Array.isArray(hasPurchased) || hasPurchased.length === 0) {
      throw new Error('You must purchase the product to leave a review');
    }

    // Kiểm tra xem người dùng đã đánh giá sản phẩm này chưa
    const existingReview = await reviewModel.getReviewByUserAndProduct(userId, product_id);
    if (existingReview) throw new Error('You have already reviewed this product');

    return await reviewModel.createReview({ 
      user_id: userId, 
      product_id, 
      rating, 
      comment: comment?.trim() 
    });
  },

  async updateReview(userId: number, reviewId: number, { rating, comment }: Partial<ReviewData>) {
    const review = await reviewModel.getReviewById(reviewId);
    if (!review) throw new Error('Review not found');
    if (review.user_id !== userId) throw new Error('Access denied');
    
    // Kiểm tra trạng thái sản phẩm
    const product = await productModel.getProductById(review.product_id);
    if (!product) throw new Error('Product not found');
    if (product.status !== 'active') throw new Error('Cannot update review for inactive product');
    
    // Kiểm tra rating hợp lệ
    if (rating !== undefined) {
      if (rating < 1 || rating > 5) throw new Error('Rating must be between 1 and 5');
    }
    
    await reviewModel.updateReview(reviewId, { 
      rating, 
      comment: comment?.trim() 
    });
  },

  async deleteReview(userId: number, reviewId: number) {
    const review = await reviewModel.getReviewById(reviewId);
    if (!review || review.user_id !== userId) throw new Error('Review not found or access denied');
    await reviewModel.deleteReview(reviewId);
  },

  async adminDeleteReview(reviewId: number) {
    const review = await reviewModel.getReviewById(reviewId);
    if (!review) throw new Error('Review not found');
    await reviewModel.deleteReview(reviewId);
  },
};