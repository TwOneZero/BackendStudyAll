import { Router } from 'express';
import checkAuthMiddleWare from '../middlewares/auth';
import checkUserMiddleware from '../middlewares/user';
import { vote } from '../controllers/votes/vote';

const router = Router();

router.post('/', checkUserMiddleware, checkUserMiddleware, vote);

export default router;
