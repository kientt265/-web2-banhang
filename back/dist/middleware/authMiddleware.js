"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
exports.default = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return next((0, errorHandler_1.default)(401, 'Authentication required'));
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        req.body = { id: decoded.id, role: decoded.role };
        next();
    }
    catch (error) {
        next((0, errorHandler_1.default)(401, 'Invalid or expired token'));
    }
};
