import { Request, Response } from 'express';
import { Comment } from '../../entity/Comment';
import { Post } from '../../entity/Post';

export const getPostComments = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;

  try {
    const post = await Post.findOneByOrFail({ identifier, slug });

    //투표정보 relation
    const comments = await Comment.find({
      where: { postId: post.id },
      order: { createdAt: 'DESC' },
      relations: { votes: true },
    });

    //댓글 마다 유저 정보의 투표 정보 저장해주기
    if (res.locals.user) {
      comments.forEach((c) => c.setUserVote(res.locals.user));
    }

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ getCommentError: error });
  }
};
