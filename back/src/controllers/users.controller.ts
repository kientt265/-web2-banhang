// routes/user.js
import express, {Express, Request, Response} from 'express';
import * as userService from '../services/users.service';

export const register = async (req: Request, res: Response) => {
  try {

    if (!req.body || !req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).json({ error: 'Thiếu thông tin đăng ký' });
    }

    const user = await userService.register(req.body);
    res.status(201).json({id: user.id, message: 'Tạo người dùng thành công'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Lỗi đăng ký người dùng: ${err}` });
  }
};
// export function register(arg0: string, register: any) {
//     throw new Error('Function not implemented.');
// }

