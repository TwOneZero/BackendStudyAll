import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';

//local (미들웨어 간 ) 저장된 유저 check 하기
const checkAuthMiddleWare = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: User | undefined = res.locals.user;

    if (!user) throw new Error('Unauthenticated!');

    return next();
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: 'Unauthenticated!' });
  }
};

export default checkAuthMiddleWare;
