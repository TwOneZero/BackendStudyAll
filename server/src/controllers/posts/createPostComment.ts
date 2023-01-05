import { Request, Response } from 'express';
import { Comment } from '../../entity/Comment';
import { Post } from '../../entity/Post';

export const createComment = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  //body : newComment
  const commentBody = req.body.body;
  const user = res.locals.user;

  try {
    //url parameter 에 있는 정보로 Post 정보 가져오기
    const post = await Post.findOneByOrFail({ identifier, slug });

    //댓글 생성
    const comment = new Comment();
    comment.body = commentBody;
    comment.post = post;
    comment.user = user;

    //user의 댓글 투표 정보 저장
    post.setUserVote(user);

    await comment.save();

    return res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ postCommentError: '게시물을 찾을 수 없습니다.' });
  }
};
