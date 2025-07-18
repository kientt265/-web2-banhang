import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as userModel from '../models/users.model';

interface CreateUserParams {
  username: string;
  email: string;
  password: string;
  full_name: string;
  phone: string;
  address: string;
  role: string;
}

export async function register({ username, email, password, full_name, phone, address, role }: CreateUserParams) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.createUser({
        username,
        email,
        password: hashedPassword,
        full_name,
        phone,
        address,
        role: role || 'user'
    });
    return user;
}

