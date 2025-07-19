import express from 'express';
import { productController } from '../controllers/products.controller';
import authMiddleware from '../middleware/authMiddleware';
import adminMiddleware from '../middleware/adminMiddleware';
import {validateSchema, validateParams} from '../middleware/validate';
import * as validator from '../utils/validator';
const router = express.Router();

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Admin routes
router.post('/', authMiddleware, adminMiddleware, validateSchema(validator.createProductSchema), productController.createProduct);
router.put('/:id', authMiddleware, adminMiddleware, validateSchema(validator.updateProductSchema), productController.updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, productController.deleteProduct);

export default router;