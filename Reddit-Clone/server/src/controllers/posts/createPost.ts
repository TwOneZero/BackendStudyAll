import { Request, Response } from 'express';
import { Post } from '../../entity/Post';
import { Sub } from '../../entity/Sub';

export const createPost = async (req: Request, res: Response) => {
  const { title, body, sub } = req.body;

  const user = res.locals.user;

  try {
    const subRecord = await Sub.findOneByOrFail({ name: sub });
    const post = new Post();
    post.title = title;
    post.body = body;
    post.user = user;
    post.sub = subRecord;

    await post.save();

    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: '문제가 발생했습니다.' });
  }
};
