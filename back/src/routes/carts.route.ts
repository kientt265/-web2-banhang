import express from 'express';
import { cartController } from '../controllers/carts.controller';
import authMiddleware from '../middleware/authMiddleware';
import adminMiddleware from '../middleware/adminMiddleware';
import {validateSchema, validateParams} from '../middleware/validate';
import * as validator from '../utils/validator';

const router = express.Router();

// Authenticated routes
router.get('/', authMiddleware, cartController.getCart);
router.post('/', authMiddleware, validateSchema(validator.addCartItemSchema), cartController.addCartItem);
router.put('/items/:itemId', authMiddleware, validateSchema(validator.updateCartItemSchema), cartController.updateCartItem);
router.delete('/items/:itemId', authMiddleware, cartController.deleteCartItem);
router.delete('/', authMiddleware, cartController.clearCart);

export default router;