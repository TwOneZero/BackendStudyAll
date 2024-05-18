import { Router } from 'express';
import { login } from '../controllers/auth/login';
import { logout } from '../controllers/auth/logout';
import { me } from '../controllers/auth/me';
import { register } from '../controllers/auth/register';
import checkAuthMiddleWare from '../middlewares/auth';
import checkUserMiddleware from '../middlewares/user';

const router = Router();

router.get('/me', checkUserMiddleware, checkAuthMiddleWare, me);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', checkUserMiddleware, checkAuthMiddleWare, logout);

export default router;
