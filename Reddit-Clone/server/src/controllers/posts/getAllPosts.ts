import { Request, Response } from 'express';
import { Post } from '../../entity/Post';

export const getAllPosts = async (req: Request, res: Response) => {
  //현재페이지
  const currentPage: number = (req.query.page || 0) as number;
  //한 번에 보여줄 페이지 volume
  const perPage: number = (req.query.count || 5) as number;

  console.log(perPage);

  /**
   * 게시물 가져오기
   * 최신순(내림차순), sub, vote, comments 와 같이
   * 가져올 페이지 수
   */
  try {
    const posts = await Post.find({
      order: { createdAt: 'DESC' },
      relations: ['sub', 'votes', 'comments'],
      skip: currentPage * perPage,
      take: perPage,
    });
    //vote 수 셋팅
    posts.forEach((p) => p.setUserVote(res.locals.user));
    console.log(posts, posts.length);

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ getAllPostsError: 'getAllPostsError', error });
  }
};
