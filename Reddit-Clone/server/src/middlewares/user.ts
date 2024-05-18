import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
const checkUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token) return next();

    const { userName }: any = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOneBy({ username: userName });

    if (!user) throw new Error('Unauthenticated');

    //res.local 에 넣어주기 -> 라우터(미들웨어) 간 사용 가능
    res.locals.user = user;
    return next();
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Someting went wrong for checking user' });
  }
};

export default checkUserMiddleware;
