import jwt from 'jsonwebtoken';
import config from '../config/config';
import createError from '../utils/errorHandler';
import { Request, Response, NextFunction } from 'express';


export default  (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next(createError(401, 'Authentication required'));

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as { id: string; role: string };
    req.body = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    next(createError(401, 'Invalid or expired token'));
  }
};