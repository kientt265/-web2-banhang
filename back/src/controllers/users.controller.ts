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

export const login = async (req: Request, res: Response) => {
  try {
    if (!req.body || !req.body.email || !req.body.password) {
      return res.status(400).json({ error: 'Vui lòng nhập thông tin đăng nhập!' });
    }
    const {user, token} = await userService.login(req.body.email, req.body.password);
    res.status(200).json({token, user: {id: user.id, user: user.username, email: user.email, role: user.role}, message: 'Đăng nhập thành công'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Lỗi đăng nhập người dùng: ${err}` });
  }
};
//Authen Users

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await userService.getProfile(parseInt(req.user!.userId));
    res.status(200).json({user, message: 'Lấy thông tin người dùng thành công'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Lỗi lấy thông tin người dùng: ${err}` });
  }
}

export const updateProfile = async (req: Request, res: Response) => {
  try {
    if (!req.body ||!req.body.username ||!req.body.email  ||!req.body.full_name ||!req.body.phone ||!req.body.address) {
      return res.status(400).json({ error: 'Vui lòng nhập thông tin người dùng!' });
    }
    const user = await userService.updateProfile(req.body.id, req.body);
    res.status(200).json({message: 'Cập nhật thông tin người dùng thành công'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Lỗi cập nhật thông tin người dùng: ${err}` });
  }
}

export const deleteProfile = async (req: Request, res: Response) => {
  try {
    
    const user = await userService.deleteProfile(req.body.id);
    res.status(200).json({message: 'Xóa người dùng thành công'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Lỗi xóa người dùng: ${err}` });
  }
}



//Admin

export const getUserById = async (req: Request, res: Response) => {
  try {
    if(!req.params.id) {
      return res.status(400).json({ error: 'Vui lòng nhập thông tin người dùng!' });
    }
    const user = await userService.getUserById(parseInt(req.params.id));
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Lỗi lấy thông tin người dùng: ${err}` });
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Lỗi lấy thông tin người dùng: ${err}` });
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    if(!req.params.id) {
      return res.status(400).json({ error: 'Vui lòng nhập thông tin người dùng!' });
    }
    const user = await userService.deleteUser(parseInt(req.params.id));
    res.status(200).json( {message: 'Xóa người dùng thành công'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Lỗi xóa người dùng: ${err}` });
  }
}

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    if(!req.params.email) {
      return res.status(400).json({ error: 'Vui lòng nhập thông tin người dùng!' });
    }
    const user = await userService.getUserByEmail(req.params.email);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Lỗi lấy thông tin người dùng: ${err}` });
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    if(!req.params.id) {
      return res.status(400).json({ error: 'Vui lòng nhập thông tin người dùng!' });
    }
    const user = await userService.updateUser(parseInt(req.params.id), req.body);
    res.status(200).json( {message: 'Cập nhật người dùng thành công'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Lỗi cập nhật người dùng: ${err}` });
  }
}
// export function register(arg0: string, register: any) {
//     throw new Error('Function not implemented.');
// }

