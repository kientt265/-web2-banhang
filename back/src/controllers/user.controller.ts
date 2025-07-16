// routes/user.js
import express, {Express, Request, Response} from 'express';
import pool from '../db';


const getUserController = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi server nè hi' });
  }
}

export {getUserController};