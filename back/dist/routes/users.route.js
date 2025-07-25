"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// routes/user.ts
const express_1 = require("express");
const userController = __importStar(require("../controllers/users.controller"));
const validate_1 = require("../middleware/validate");
const validator = __importStar(require("../utils/validator"));
const router = (0, express_1.Router)();
//Public Routes
router.post('/userRegister', (0, validate_1.validateSchema)(validator.registerSchema), userController.register);
router.get('/userLogin', (0, validate_1.validateSchema)(validator.loginSchema), userController.login);
//Authen Users
router.get('/Profile', userController.getProfile);
router.put('/Profile', (0, validate_1.validateSchema)(validator.updateUserSchema), userController.updateProfile);
router.delete('/Profile', userController.deleteProfile);
//Admin
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUser);
router.get('/', userController.getAllUsers);
router.get('/:email', userController.getUserByEmail);
router.put('/:id', (0, validate_1.validateSchema)(validator.updateUserSchema), userController.updateUser);
exports.default = router;
