// routes/user.ts
import { Router} from 'express';
import * as userController from '../controllers/users.controller';


const router = Router();

router.post('/userRegister', userController.register);

export default router;