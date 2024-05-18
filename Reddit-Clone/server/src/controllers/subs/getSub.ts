import { Request, Response } from 'express';
import { Post } from '../../entity/Post';
import { Sub } from '../../entity/Sub';

export const getSub = async (req: Request, res: Response) => {
  const name = req.params.name;

  try {
    const sub = await Sub.findOneByOrFail({ name });

    const posts = await Post.find({
      where: { subName: sub.name },
      order: { createdAt: 'DESC' },
      relations: ['comments', 'votes'],
    });

    //sub posts 뿌려주기
    sub.posts = posts;

    //유저의 vote 보여주기
    if (res.locals.user) {
      sub.posts.forEach((p) => p.setUserVote(res.locals.user));
    }

    return res.status(200).json(sub);
  } catch (error) {
    return res.status(404).json({ error: 'Sub 를 찾을 수 없습니다.' });
  }
};
