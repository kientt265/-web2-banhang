import { cartModel } from '../models/carts.model';
import { productModel } from '../models/products.model';

interface CartItemData {
  product_id: number;
  quantity: number;
}



export const cartService = {
  async getCart(userId: number) {
    if (!userId) throw new Error('User ID is required');
    
    let cart = await cartModel.getCartByUserId(userId);
    if (!cart) {
      cart = await cartModel.createCart(userId);
      if (!cart) throw new Error('Failed to create cart');
    }
    
    const items = await cartModel.getCartItems(cart.id);
    return { id: cart.id, user_id: cart.user_id, items };
  },

  async addCartItem(userId: number, { product_id, quantity }: CartItemData) {
    if (!userId) throw new Error('User ID is required');
    if (!product_id) throw new Error('Product ID is required');
    if (!quantity || quantity < 1) throw new Error('Quantity must be greater than 0');

    const product = await productModel.getProductById(product_id);
    if (!product) throw new Error('Product not found');
    if (product.stock_quantity < quantity) throw new Error('Insufficient stock');
    if (product.status !== 'active') throw new Error('Product is not available');

    let cart = await cartModel.getCartByUserId(userId);
    if (!cart) {
      cart = await cartModel.createCart(userId);
      if (!cart) throw new Error('Failed to create cart');
    }

    const existingItem = await cartModel.getCartItemByProductId(cart.id, product_id);
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity < 1) throw new Error('Invalid quantity');
      if (product.stock_quantity < newQuantity) throw new Error('Insufficient stock');
      return await cartModel.updateCartItem(existingItem.id, newQuantity);
    }

    const result = await cartModel.addCartItem(cart.id, product_id, quantity);
    if (!result) throw new Error('Failed to add item to cart');
    return result;
  },

  async updateCartItem(userId: number, itemId: number, quantity: number) {
    if (!userId) throw new Error('User ID is required');
    if (!itemId) throw new Error('Item ID is required');
    if (quantity < 0) throw new Error('Quantity cannot be negative');

    const cart = await cartModel.getCartByUserId(userId);
    if (!cart) throw new Error('Cart not found');

    const item = await cartModel.getCartItemById(itemId);
    if (!item || item.cart_id !== cart.id) throw new Error('Cart item not found');

    const product = await productModel.getProductById(item.product_id);
    if (!product) throw new Error('Product not found');
    if (product.stock_quantity < quantity) throw new Error('Insufficient stock');
    if (product.status !== 'active') throw new Error('Product is not available');

    await cartModel.updateCartItem(itemId, quantity);
  },

  async deleteCartItem(userId: number, itemId: number) {
    if (!userId) throw new Error('User ID is required');
    if (!itemId) throw new Error('Item ID is required');

    const cart = await cartModel.getCartByUserId(userId);
    if (!cart) throw new Error('Cart not found');

    const item = await cartModel.getCartItemById(itemId);
    if (!item || item.cart_id !== cart.id) throw new Error('Cart item not found');

    await cartModel.deleteCartItem(itemId);
  },

  async clearCart(userId: number) {
    if (!userId) throw new Error('User ID is required');

    const cart = await cartModel.getCartByUserId(userId);
    if (!cart) throw new Error('Cart not found');

    await cartModel.clearCart(cart.id);
  },
};