import { cartModel } from '../models/carts.model';
import { productModel } from '../models/products.model';

interface CartItemData {
  product_id: number;
  quantity: number;
}

export const cartService = {
  async getCart(userId: number) {
    let cart = await cartModel.getCartByUserId(userId);
    if (!cart) {
      cart = await cartModel.createCart(userId);
    }
    const items = await cartModel.getCartItems(cart.id);
    return { id: cart.id, user_id: cart.user_id, items };
  },

  async addCartItem(userId: number, { product_id, quantity }: CartItemData) {
    const product = await productModel.getProductById(product_id);
    if (!product) throw new Error('Product not found');
    if (product.stock_quantity < quantity) throw new Error('Insufficient stock');
    if (product.status !== 'active') throw new Error('Product is not available');

    let cart = await cartModel.getCartByUserId(userId);
    if (!cart) {
      cart = await cartModel.createCart(userId);
    }

    const existingItem = await cartModel.getCartItemByProductId(cart.id, product_id);
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (product.stock_quantity < newQuantity) throw new Error('Insufficient stock');
      return await cartModel.updateCartItem(existingItem.id, newQuantity);
    }

    return await cartModel.addCartItem(cart.id, product_id, quantity);
  },

  async updateCartItem(userId: number, itemId: number, quantity: number) {
    const cart = await cartModel.getCartByUserId(userId);
    if (!cart) throw new Error('Cart not found');

    const item = await cartModel.getCartItemById(itemId);
    if (!item || item.cart_id !== cart.id) throw new Error('Cart item not found');

    const product = await productModel.getProductById(item.product_id);
    if (!product) throw new Error('Product not found');
    if (product.stock_quantity < quantity) throw new Error('Insufficient stock');

    await cartModel.updateCartItem(itemId, quantity);
  },

  async deleteCartItem(userId: number, itemId: number) {
    const cart = await cartModel.getCartByUserId(userId);
    if (!cart) throw new Error('Cart not found');

    const item = await cartModel.getCartItemById(itemId);
    if (!item || item.cart_id !== cart.id) throw new Error('Cart item not found');

    await cartModel.deleteCartItem(itemId);
  },

  async clearCart(userId: number) {
    const cart = await cartModel.getCartByUserId(userId);
    if (!cart) throw new Error('Cart not found');

    await cartModel.clearCart(cart.id);
  },
};