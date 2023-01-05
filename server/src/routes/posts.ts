import { Router } from 'express';
import checkAuthMiddleWare from '../middlewares/auth';
import checkUserMiddleware from '../middlewares/user';
import { createPost } from '../controllers/posts/createPost';
import { getPost } from '../controllers/posts/getPost';
import { createComment } from '../controllers/posts/createPostComment';
import { getPostComments } from '../controllers/posts/getComments';

const router = Router();
router.get('/:identifier/:slug', checkUserMiddleware, getPost);
router.get('/:identifier/:slug/comments', checkUserMiddleware, getPostComments);
router.post('/:identifier/:slug/comments', checkUserMiddleware, createComment);
router.post('/create', checkUserMiddleware, checkAuthMiddleWare, createPost);

export default router;
