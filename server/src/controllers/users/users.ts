import { Request, Response } from 'express';
import { Comment } from '../../entity/Comment';
import { Post } from '../../entity/Post';
import { User } from '../../entity/User';

export const getUserData = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneOrFail({
      where: { username: req.params.username },
      select: ['username', 'createdAt'],
    });

    //posts정보
    const posts = await Post.find({
      where: { username: user.username },
      relations: ['comments', 'votes', 'sub'],
    });
    //comments 정보
    const comments = await Comment.find({
      where: { username: user.username },
      relations: ['post'],
    });

    //Vote 정보 setting
    posts.forEach((p) => p.setUserVote(res.locals.user));
    comments.forEach((c) => c.setUserVote(res.locals.user));

    //유저 데이터 빈 배열에 user와 관련된 정보를 push 해줌
    let userData: any[] = [];
    //toJSON 을 통해 instance 를 객체로 바꾸어줌
    posts.forEach((p) => userData.push({ type: 'Post', ...p.toJSON() }));
    comments.forEach((c) => userData.push({ type: 'Comment', ...c.toJSON() }));

    //CreatedAt(만들어진) 순으로 sorting
    userData.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    console.log('<-----userData----->\n');
    userData.forEach((u) => console.log(u));

    return res.status(200).json({ user, userData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ GetUserDataError: error });
  }
};
