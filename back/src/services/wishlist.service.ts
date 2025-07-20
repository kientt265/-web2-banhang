import { wishlistModel } from '../models/wishlist.model';
import { productModel } from '../models/products.model';

export const wishlistService = {
  async getWishlist(userId: number) {
    const wishlist = await wishlistModel.getWishlistByUserId(userId);
    return wishlist;
  },

  async addWishlistItem(userId: number, productId: number) {
    if (!userId) throw new Error('User ID is required');
    if (!productId) throw new Error('Product ID is required');

    const product = await productModel.getProductById(productId);
    if (!product) throw new Error('Product not found');
    if (product.status !== 'active') throw new Error('Product is not available');

    const existingItem = await wishlistModel.getWishlistItemByUserAndProduct(userId, productId);
    if (existingItem) throw new Error('Product already in wishlist');

    return await wishlistModel.addWishlistItem(userId, productId);
  },

  async deleteWishlistItem(userId: number, productId: number) {
    const item = await wishlistModel.getWishlistItemByUserAndProduct(userId, productId);
    if (!item) throw new Error('Product not found in wishlist');

    await wishlistModel.deleteWishlistItem(userId, productId);
  },

  async clearWishlist(userId: number) {
    await wishlistModel.clearWishlist(userId);
  },
};