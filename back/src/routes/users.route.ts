// routes/user.ts
import { Router} from 'express';
import * as userController from '../controllers/users.controller';
import {validateSchema, validateParams} from '../middleware/validate';
import * as validator from '../utils/validator';
import authMiddleware from '../middleware/authMiddleware';
import adminMiddleware from '../middleware/adminMiddleware';
const router = Router();

//Public Routes
router.post('/userRegister', validateSchema(validator.registerSchema) , userController.register);
router.get('/userLogin', validateSchema(validator.loginSchema), userController.login);

router.use(authMiddleware);
//Authen Users
router.get('/Profile', userController.getProfile);
router.put('/Profile', validateSchema(validator.updateUserSchema), userController.updateProfile);
router.delete('/Profile', userController.deleteProfile);

router.use(adminMiddleware);
//Admin
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUser);
router.get('/', userController.getAllUsers);
router.get('/:email', userController.getUserByEmail);
router.put('/:id', validateSchema(validator.updateUserSchema), userController.updateUser);
export default router;