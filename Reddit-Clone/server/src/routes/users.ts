import { Router } from 'express';
import { getUserData } from '../controllers/users/users';
import checkUserMiddleware from '../middlewares/user';

const router = Router();

router.get('/:username', checkUserMiddleware, getUserData);

export default router;
