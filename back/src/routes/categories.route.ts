import express from 'express';
import { categoryController } from '../controllers/categories.controller';
import authMiddleware from '../middleware/authMiddleware';
import adminMiddleware from '../middleware/adminMiddleware';
import {validateSchema, validateParams} from '../middleware/validate';
import * as validator from '../utils/validator';

const router = express.Router();

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// Admin routes
router.post('/', authMiddleware, adminMiddleware, validateSchema(validator.createCategorySchema), categoryController.createCategory);
router.put('/:id', authMiddleware, adminMiddleware, validateSchema(validator.updateCategorySchema), categoryController.updateCategory);
router.delete('/:id', authMiddleware, adminMiddleware, categoryController.deleteCategory);

export default router;