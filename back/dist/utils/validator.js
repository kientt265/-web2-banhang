"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object({
    username: joi_1.default.string().min(3).max(50).required(),
    email: joi_1.default.string().email().max(100).required(),
    password: joi_1.default.string().min(6).max(255).required(),
    full_name: joi_1.default.string().max(100).optional(),
    phone: joi_1.default.string().max(20).optional(),
    address: joi_1.default.string().optional(),
    role: joi_1.default.string().valid('user', 'admin').optional(),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
exports.updateUserSchema = joi_1.default.object({
    username: joi_1.default.string().min(3).max(50).optional(),
    email: joi_1.default.string().email().max(100).optional(),
    password: joi_1.default.string().min(6).max(255).optional(),
    full_name: joi_1.default.string().max(100).optional(),
    phone: joi_1.default.string().max(20).optional(),
    address: joi_1.default.string().optional(),
    role: joi_1.default.string().valid('user', 'admin').optional(),
});
