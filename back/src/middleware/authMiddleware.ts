import jwt from 'jsonwebtoken';
import config from '../config/config';
import createError from '../utils/errorHandler';
import { Request, Response, NextFunction } from 'express';

// Mở rộng kiểu Request để thêm user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
      };
    }
  }
}

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next(createError(401, 'Authentication required'));

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as { userId: string; role: string };
    // Lưu thông tin user vào req.user thay vì req.body
    req.user = {
      userId: decoded.userId,
      role: decoded.role
    };
    next();
  } catch (error) {
    next(createError(401, 'Invalid or expired token'));
  }
};