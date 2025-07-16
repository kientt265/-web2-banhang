"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/user.ts
const express_1 = require("express");
const test_controller_1 = require("../controllers/test.controller");
const router = (0, express_1.Router)();
router.get('/tests', test_controller_1.getTestController);
exports.default = router;
