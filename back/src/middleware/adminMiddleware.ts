import { Request, Response, NextFunction } from 'express';
import createError from '../utils/errorHandler';

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') return next(createError(403, 'Admin access required'));
  next();
};