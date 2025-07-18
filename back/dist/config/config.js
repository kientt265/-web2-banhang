"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.default = {
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT || 3000
};
