import { Request, Response } from 'express';
import { Post } from '../../entity/Post';

export const getPost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;

  try {
    const post = await Post.findOneOrFail({
      where: {
        identifier,
        slug,
      },
      relations: ['sub', 'votes'],
    });

    if (res.locals.user) {
      post.setUserVote(res.locals.user);
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(404).json({ error: '게시물을 찾을 수 없습니다.' });
  }
};
