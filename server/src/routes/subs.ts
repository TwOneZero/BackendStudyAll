import { Request, Response, Router } from 'express';
import createSubs from '../controllers/subs/create';
import checkUserMiddleware from '../middlewares/user';
import checkAuthMiddleWare from '../middlewares/auth';
import topSubs from '../controllers/subs/topSubs';
import getSub from '../controllers/subs/getSub';
const router = Router();

router.get('/:name', checkUserMiddleware, getSub);
router.post('/', checkUserMiddleware, checkAuthMiddleWare, createSubs);
router.get('/sub/topSubs', topSubs);
export default router;
