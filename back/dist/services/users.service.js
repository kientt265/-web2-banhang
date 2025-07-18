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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
exports.deleteProfile = deleteProfile;
exports.getUserById = getUserById;
exports.getAllUsers = getAllUsers;
exports.deleteUser = deleteUser;
exports.getUserByEmail = getUserByEmail;
exports.updateUser = updateUser;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel = __importStar(require("../models/users.model"));
function register(_a) {
    return __awaiter(this, arguments, void 0, function* ({ username, email, password, full_name, phone, address, role }) {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield userModel.createUser({
            username,
            email,
            password: hashedPassword,
            full_name,
            phone,
            address,
            role: role || 'user'
        });
        return user;
    });
}
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userModel.getUserByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        return user;
    });
}
//Authen Users
function getProfile(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userModel.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    });
}
function updateProfile(userId_1, _a) {
    return __awaiter(this, arguments, void 0, function* (userId, { username, email, password, full_name, phone, address }) {
        if (password) {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            password = hashedPassword;
        }
        yield userModel.updateUser(userId, {
            username,
            email,
            password,
            full_name,
            phone,
            address,
            role: 'user'
        });
    });
}
function deleteProfile(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userModel.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        yield userModel.deleteUser(userId);
    });
}
//Admin
function getUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userModel.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    });
}
function getAllUsers() {
    return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
        const users = yield userModel.getAllUsers({ page, limit });
        return users;
    });
}
function deleteUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userModel.deleteUser(userId);
        return user;
    });
}
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userModel.getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    });
}
function updateUser(userId_1, _a) {
    return __awaiter(this, arguments, void 0, function* (userId, { username, email, password, full_name, phone, address, role }) {
        if (password) {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            password = hashedPassword;
        }
        yield userModel.updateUser(userId, {
            username,
            email,
            password,
            full_name,
            phone,
            address,
            role
        });
        return getUserById(userId);
    });
}
