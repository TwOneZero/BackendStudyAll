import { NextFunction, Request, Response } from 'express';
import { Sub } from '../../entity/Sub';
import { User } from '../../entity/User';

//커뮤니티 소유자인지 검사하는 미들웨어
export const ownSub = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: User = res.locals.user;
  try {
    const sub = await Sub.findOneByOrFail({ name: req.params.name });

    if (sub.username !== user.username) {
      return res
        .status(403)
        .json({ error: '해당 커뮤니티 소유자가 아닙니다.' });
    }
    //커뮤니티 소유자가 맞으면 넘겨주기
    res.locals.sub = sub;
    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
