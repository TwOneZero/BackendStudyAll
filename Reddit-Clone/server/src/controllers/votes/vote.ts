import { Request, Response } from 'express';
import { Comment } from '../../entity/Comment';
import { Post } from '../../entity/Post';
import { User } from '../../entity/User';
import { Vote } from '../../entity/Vote';

export const vote = async (req: Request, res: Response) => {
  const { identifier, slug, value, commentIdentifier } = req.body;

  //value check
  if (![-1, 0, 1].includes(value)) {
    return res
      .status(400)
      .json({ value: '-1, 0 or 1 value만 올 수 있습니다. ' });
  }

  try {
    const user: User = res.locals.user;
    let post: Post | undefined = await Post.findOneByOrFail({
      identifier,
      slug,
    });
    let vote: Vote | undefined;
    let comment: Comment | undefined;

    if (commentIdentifier) {
      //댓글 식별자가 있는 경우 Comment로 vote 찾기
      comment = await Comment.findOneByOrFail({
        identifier: commentIdentifier,
      });
      vote = await Vote.findOneBy({
        username: user.username,
        commentId: comment.id,
      });
    } else {
      //아닐 경우 Post 로 vote 찾기
      vote = await Vote.findOneBy({ username: user.username, postId: post.id });
    }

    if (!vote && value === 0) {
      //vote 없고 value == 0 인 경우 -> 오류
      return res.status(400).json({ error: 'Vote를 찾을 수 없습니다.' });
    } else if (!vote) {
      //vote 없으면 새로 생성
      vote = new Vote();
      vote.user = user;
      vote.value = value;
      //게시물에 속한 vote 인지 댓글에 속한 vote 인지
      if (comment) vote.comment = comment;
      else vote.post = post;
      await vote.save();
    } else if (value === 0) {
      //vote 존재 , value == 0 -> db 에서 제거
      await vote.remove();
    } else if (vote.value !== value) {
      //vote 존재, 기존 vote와 새로 들온 vote value 다른 경우
      vote.value = value;
      await vote.save();
    }

    post = await Post.findOneOrFail({
      where: { identifier, slug },
      relations: ['comments', 'comments.votes', 'sub', 'votes'],
    });

    //게시물과 댓글의 투표수 셋팅
    post.setUserVote(user);
    post.comments.forEach((c) => c.setUserVote(user));

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'vote 문제 발생' });
  }
};
