import express from 'express';
import { reviewController } from '../controllers/reviews.controller';
import authMiddleware from '../middleware/authMiddleware';
import adminMiddleware from '../middleware/adminMiddleware';
import {validateSchema, validateParams} from '../middleware/validate';
import * as validator from '../utils/validator';

const router = express.Router();

// Public routes
router.get('/product/:productId', reviewController.getReviewsByProduct);

// Authenticated routes (user)
router.post('/', authMiddleware, validateSchema(validator.createReviewSchema), reviewController.createReview);
router.put('/:id', authMiddleware, validateSchema(validator.updateReviewSchema), reviewController.updateReview);
router.delete('/:id', authMiddleware, reviewController.deleteReview);

// Admin routes
router.get('/all', authMiddleware, adminMiddleware, reviewController.getAllReviews);
router.delete('/admin/:id', authMiddleware, adminMiddleware, reviewController.adminDeleteReview);

export default router;