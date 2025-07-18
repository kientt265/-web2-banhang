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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserByEmail = exports.deleteUser = exports.getAllUsers = exports.getUserById = exports.deleteProfile = exports.updateProfile = exports.getProfile = exports.login = exports.register = void 0;
const userService = __importStar(require("../services/users.service"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || !req.body.username || !req.body.email || !req.body.password) {
            return res.status(400).json({ error: 'Thiếu thông tin đăng ký' });
        }
        const user = yield userService.register(req.body);
        res.status(201).json({ id: user.id, message: 'Tạo người dùng thành công' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: `Lỗi đăng ký người dùng: ${err}` });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || !req.body.email || !req.body.password) {
            return res.status(400).json({ error: 'Vui lòng nhập thông tin đăng nhập!' });
        }
        const user = yield userService.login(req.body.email, req.body.password);
        res.status(200).json({ id: user.id, message: 'Đăng nhập thành công' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: `Lỗi đăng nhập người dùng: ${err}` });
    }
});
exports.login = login;
//Authen Users
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.getUserById(req.body.id);
        res.status(200).json({ user, message: 'Lấy thông tin người dùng thành công' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: `Lỗi lấy thông tin người dùng: ${err}` });
    }
});
exports.getProfile = getProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || !req.body.username || !req.body.email || !req.body.password || !req.body.full_name || !req.body.phone || !req.body.address) {
            return res.status(400).json({ error: 'Vui lòng nhập thông tin người dùng!' });
        }
        const user = yield userService.updateProfile(req.body.id, req.body);
        res.status(200).json({ message: 'Cập nhật thông tin người dùng thành công' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: `Lỗi cập nhật thông tin người dùng: ${err}` });
    }
});
exports.updateProfile = updateProfile;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || !req.body.id) {
            return res.status(400).json({ error: 'Vui lòng nhập thông tin người dùng!' });
        }
        const user = yield userService.deleteProfile(req.body.id);
        res.status(200).json({ message: 'Xóa người dùng thành công' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: `Lỗi xóa người dùng: ${err}` });
    }
});
exports.deleteProfile = deleteProfile;
//Admin
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id) {
            return res.status(400).json({ error: 'Vui lòng nhập thông tin người dùng!' });
        }
        const user = yield userService.getUserById(parseInt(req.params.id));
        res.status(200).json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: `Lỗi lấy thông tin người dùng: ${err}` });
    }
});
exports.getUserById = getUserById;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService.getAllUsers();
        res.status(200).json(users);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: `Lỗi lấy thông tin người dùng: ${err}` });
    }
});
exports.getAllUsers = getAllUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id) {
            return res.status(400).json({ error: 'Vui lòng nhập thông tin người dùng!' });
        }
        const user = yield userService.deleteUser(parseInt(req.params.id));
        res.status(200).json({ message: 'Xóa người dùng thành công' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: `Lỗi xóa người dùng: ${err}` });
    }
});
exports.deleteUser = deleteUser;
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.email) {
            return res.status(400).json({ error: 'Vui lòng nhập thông tin người dùng!' });
        }
        const user = yield userService.getUserByEmail(req.params.email);
        res.status(200).json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: `Lỗi lấy thông tin người dùng: ${err}` });
    }
});
exports.getUserByEmail = getUserByEmail;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id) {
            return res.status(400).json({ error: 'Vui lòng nhập thông tin người dùng!' });
        }
        const user = yield userService.updateUser(parseInt(req.params.id), req.body);
        res.status(200).json({ message: 'Cập nhật người dùng thành công' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: `Lỗi cập nhật người dùng: ${err}` });
    }
});
exports.updateUser = updateUser;
// export function register(arg0: string, register: any) {
//     throw new Error('Function not implemented.');
// }
