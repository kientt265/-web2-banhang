import Joi from 'joi';

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(6).max(255).required(),
  full_name: Joi.string().max(100).optional(),
  phone: Joi.string().max(20).optional(),
  address: Joi.string().optional(),
  role: Joi.string().valid('user', 'admin').optional(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(50).optional(),
  email: Joi.string().email().max(100).optional(),
  password: Joi.string().min(6).max(255).optional(),
  full_name: Joi.string().max(100).optional(),
  phone: Joi.string().max(20).optional(),
  address: Joi.string().optional(),
  role: Joi.string().valid('user', 'admin').optional(),
});

export const createProductSchema = Joi.object({
  name: Joi.string().min(1).max(200).required(),
  description: Joi.string().optional().allow(''),
  price: Joi.number().min(0).required(),
  stock_quantity: Joi.number().integer().min(0).required(),
  category_id: Joi.number().integer().optional(),
  image_url: Joi.string().uri().optional().allow(''),
  status: Joi.string().valid('active', 'inactive', 'out_of_stock').optional(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(1).max(200).optional(),
  description: Joi.string().optional().allow(''),
  price: Joi.number().min(0).optional(),
  stock_quantity: Joi.number().integer().min(0).optional(),
  category_id: Joi.number().integer().optional(),
  image_url: Joi.string().uri().optional().allow(''),
  status: Joi.string().valid('active', 'inactive', 'out_of_stock').optional(),
}).min(1);

export const createCategorySchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  description: Joi.string().optional().allow(''),
  parent_id: Joi.number().integer().optional().allow(null),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().min(1).max(100).optional(),
  description: Joi.string().optional().allow(''),
  parent_id: Joi.number().integer().optional().allow(null),
}).min(1);

export const addCartItemSchema = Joi.object({
  product_id: Joi.number().integer().min(1).required(),
  quantity: Joi.number().integer().min(1).required(),
});

export const updateCartItemSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required(),
});

export const createOrderSchema = Joi.object({
  shipping_address: Joi.string().min(1).required(),
  shipping_phone: Joi.string().min(1).required()
});

export const updateOrderStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'processing', 'shipped', 'delivered', 'cancelled').required(),
});

export const createReviewSchema = Joi.object({
  product_id: Joi.number().integer().min(1).required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().optional().allow(''),
});

export const updateReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).optional(),
  comment: Joi.string().optional().allow(''),
}).min(1);

export const addWishlistItemSchema = Joi.object({
  product_id: Joi.number().integer().min(1).required(),
});

