import 'dotenv/config';

export default {
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3000
};