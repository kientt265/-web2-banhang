import express from 'express';
import { orderController } from '../controllers/orders.controller';
import authMiddleware from '../middleware/authMiddleware';
import adminMiddleware from '../middleware/adminMiddleware';
import * as validator from '../utils/validator';
import {validateSchema, validateParams} from '../middleware/validate';

const router = express.Router();

// Authenticated routes (user)
router.get('/', authMiddleware, orderController.getUserOrders);
router.get('/:id', authMiddleware, orderController.getOrderById);
router.post('/', authMiddleware, validateSchema(validator.createOrderSchema), orderController.createOrder);
router.delete('/:id', authMiddleware, orderController.cancelOrder);

// Admin routes
router.get('/all', authMiddleware, adminMiddleware, orderController.getAllOrders); //bug query order 1, 2 canceled
router.put('/:id/status', authMiddleware, adminMiddleware, validateSchema(validator.updateOrderStatusSchema), orderController.updateOrderStatus);

export default router;