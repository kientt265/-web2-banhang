"use strict";
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
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.getUserById = exports.getUserByEmail = exports.createUser = void 0;
const db_1 = __importDefault(require("../db"));
const createUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ username, email, password, full_name, phone, address, role }) {
    const [result] = yield db_1.default.query('INSERT INTO users (username, email, password, full_name, phone, address, role) VALUES (?, ?, ?, ?, ?, ?, ?)', [username, email, password, full_name, phone, address, role]);
    // Fetch the created user
    const [rows] = yield db_1.default.query('SELECT id, username, email, full_name, phone, address, role, created_at, updated_at FROM users WHERE id = ?', [result.insertId]);
    return rows[0];
});
exports.createUser = createUser;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.default.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
});
exports.getUserByEmail = getUserByEmail;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.default.query('SELECT id, username, email, full_name, phone, address, role, created_at, updated_at FROM users WHERE id = ?', [id]);
    return rows[0];
});
exports.getUserById = getUserById;
const getAllUsers = (_a) => __awaiter(void 0, [_a], void 0, function* ({ page, limit }) {
    const offset = (page - 1) * limit;
    const [rows] = yield db_1.default.query('SELECT id, username, email, full_name, phone, address, role, created_at, updated_at FROM users LIMIT ? OFFSET ?', [limit, offset]);
    return rows;
});
exports.getAllUsers = getAllUsers;
const updateUser = (id_1, _a) => __awaiter(void 0, [id_1, _a], void 0, function* (id, { username, email, password, full_name, phone, address, role }) {
    const fields = [];
    const values = [];
    if (username) {
        fields.push('username = ?');
        values.push(username);
    }
    if (email) {
        fields.push('email = ?');
        values.push(email);
    }
    if (password) {
        fields.push('password = ?');
        values.push(password);
    }
    if (full_name) {
        fields.push('full_name = ?');
        values.push(full_name);
    }
    if (phone) {
        fields.push('phone = ?');
        values.push(phone);
    }
    if (address) {
        fields.push('address = ?');
        values.push(address);
    }
    if (role) {
        fields.push('role = ?');
        values.push(role);
    }
    if (fields.length === 0)
        return;
    values.push(id);
    yield db_1.default.query(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.query('DELETE FROM users WHERE id = ?', [id]);
});
exports.deleteUser = deleteUser;
