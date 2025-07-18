import pool from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

interface CreateUserParams {
  username: string;
  email: string;
  password: string;
  full_name: string;
  phone: string;
  address: string;
  role: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  full_name: string;
  phone: string;
  address: string;
  role: string;
  created_at?: Date;
  updated_at?: Date;
}

export const createUser = async ({ username, email, password, full_name, phone, address, role }: CreateUserParams): Promise<User> => {
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO users (username, email, password, full_name, phone, address, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [username, email, password, full_name, phone, address, role]
  );
  
  // Fetch the created user
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT id, username, email, full_name, phone, address, role, created_at, updated_at FROM users WHERE id = ?', 
    [result.insertId]
  );
  
  return rows[0] as User;
};


export const getUserByEmail = async (email: string) => {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);
  return (rows as RowDataPacket[])[0];
};

export const getUserById = async (id: number) => {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT id, username, email, full_name, phone, address, role, created_at, updated_at FROM users WHERE id = ?', [id]);
  return (rows as RowDataPacket[])[0];
};

export const getAllUsers = async ({ page, limit }: { page: number; limit: number }) => {
  const offset = (page - 1) * limit;
  const [rows] = await pool.query('SELECT id, username, email, full_name, phone, address, role, created_at, updated_at FROM users LIMIT ? OFFSET ?', [limit, offset]);
  return rows;
};

export const updateUser = async (id: number, { username, email, password, full_name, phone, address, role }: CreateUserParams) => {
  const fields = [];
  const values = [];
  if (username) { fields.push('username = ?'); values.push(username); }
  if (email) { fields.push('email = ?'); values.push(email); }
  if (password) { fields.push('password = ?'); values.push(password); }
  if (full_name) { fields.push('full_name = ?'); values.push(full_name); }
  if (phone) { fields.push('phone = ?'); values.push(phone); }
  if (address) { fields.push('address = ?'); values.push(address); }
  if (role) { fields.push('role = ?'); values.push(role); }
  if (fields.length === 0) return;
  values.push(id);
  await pool.query(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);
};

export const deleteUser = async (id: number) => {
  await pool.query('DELETE FROM users WHERE id = ?', [id]);
};
