"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
exports.default = (req, res, next) => {
    var _a;
    if (((_a = req.body) === null || _a === void 0 ? void 0 : _a.role) !== 'admin')
        return next((0, errorHandler_1.default)(403, 'Admin access required'));
    next();
};
