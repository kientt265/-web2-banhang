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