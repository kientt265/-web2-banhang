import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as userModel from '../models/users.model';
import config from '../config/config';
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

export async function login(email: string, password: string) {
    const user = await userModel.getUserByEmail(email);
    if(!user) {
        throw new Error('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        throw new Error('Invalid password');
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, config.JWT_SECRET, { expiresIn: '1d' });
    return {user, token};
}

//Authen Users

export async function getProfile(userId: number) {
  const user = await userModel.getUserById(userId);
  if(!user) {
    throw new Error('User not found');
  }
  return user;
}

export async function updateProfile(userId: number, { username, email, password, full_name, phone, address }: CreateUserParams) {
  if(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    password = hashedPassword;
  }
  await userModel.updateUser(userId, {
    username,
    email,
    password,
    full_name,
    phone,
    address,
    role: 'user'
  });
}

export async function deleteProfile(userId: number) {
  const user = await userModel.getUserById(userId);
  if(!user) {
    throw new Error('User not found');
  }
  await userModel.deleteUser(userId);
}

//Admin

export async function getUserById(userId: number) {
  const user = await userModel.getUserById(userId);
  if(!user) {
    throw new Error('User not found');
  }
  return user;
}

export async function getAllUsers(page = 1, limit = 10) {
  const users = await userModel.getAllUsers({page, limit});
  return users;
}

export async function deleteUser(userId: number) {
  const user = await userModel.deleteUser(userId);
  return user;
}

export async function getUserByEmail(email: string) {
  const user = await userModel.getUserByEmail(email);
  if(!user) {
    throw new Error('User not found');
  }
  return user;
}

export async function updateUser(userId: number, { username, email, password, full_name, phone, address, role }: CreateUserParams) {
  if(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    password = hashedPassword;
  }
  await userModel.updateUser(userId, {
    username,
    email,
    password,
    full_name,
    phone,
    address,
    role
  });
  return getUserById(userId);
}

