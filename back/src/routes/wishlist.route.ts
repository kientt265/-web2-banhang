import express from 'express';
import { wishlistController } from '../controllers/wishlist.controller';
import authMiddleware from '../middleware/authMiddleware';
import * as validator from '../utils/validator';
import {validateSchema, validateParams} from '../middleware/validate';

const router = express.Router();

// Authenticated routes
router.get('/', authMiddleware, wishlistController.getWishlist);
router.post('/', authMiddleware, validateSchema(validator.addWishlistItemSchema), wishlistController.addWishlistItem);
router.delete('/:productId', authMiddleware, wishlistController.deleteWishlistItem);
router.delete('/', authMiddleware, wishlistController.clearWishlist);

export default router;