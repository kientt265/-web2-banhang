// routes/user.ts
import { Router} from 'express';
import * as userController from '../controllers/users.controller';


const router = Router();

//Public Routes
router.post('/userRegister', userController.register);
router.get('/userLogin', userController.login);

//Authen Users
router.get('/Profile', userController.getProfile);
router.put('/Profile', userController.updateProfile);
router.delete('/Profile', userController.deleteProfile);
//Admin
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUser);
router.get('/', userController.getAllUsers);
router.get('/:email', userController.getUserByEmail);
router.put('/:id', userController.updateUser);
export default router;