import { Request, Response } from 'express';
import cookie from 'cookie';

export const logout = async (req: Request, res: Response) => {
  //브라우저 쿠키를 없애주기
  res.set(
    'Set-Cookie',
    cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/',
    })
  );

  res.status(200).json({ success: true });
};
