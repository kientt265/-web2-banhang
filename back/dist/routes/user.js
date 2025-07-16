"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/user.ts
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.get('/users', user_controller_1.getUserController);
exports.default = router;
