// routes/user.ts
import { Router} from 'express';
import {getUserController} from '../controllers/user.controller';


const router = Router();

router.get('/users', getUserController);

export default router;