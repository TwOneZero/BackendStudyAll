import { Request, Response, Router } from 'express';
import { createSubs } from '../controllers/subs/createSub';
import checkUserMiddleware from '../middlewares/user';
import checkAuthMiddleWare from '../middlewares/auth';
import { topSubs } from '../controllers/subs/topSubs';
import { getSub } from '../controllers/subs/getSub';
import { ownSub } from '../controllers/subs/ownSub';
import { upload, uploadSubImage } from '../controllers/subs/uploadImage';
const router = Router();

router.get('/:name', checkUserMiddleware, getSub);
router.post('/', checkUserMiddleware, checkAuthMiddleWare, createSubs);
router.get('/sub/topSubs', topSubs);
router.post(
  '/:name/upload',
  checkUserMiddleware,
  checkAuthMiddleWare,
  ownSub,
  upload.single('file'),
  uploadSubImage
);
export default router;
