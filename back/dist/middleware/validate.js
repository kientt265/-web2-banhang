"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.validateSchema = void 0;
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const validateSchema = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details
                .map((detail) => detail.message)
                .join(', ');
            return next((0, errorHandler_1.default)(400, errorMessage));
        }
        next();
    };
};
exports.validateSchema = validateSchema;
const validateParams = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.params, { abortEarly: false });
        if (error) {
            const errorMessage = error.details
                .map((detail) => detail.message)
                .join(', ');
            return next((0, errorHandler_1.default)(400, errorMessage));
        }
        next();
    };
};
exports.validateParams = validateParams;
