import { isEmpty, validate } from 'class-validator';
import { Request, Response } from 'express';
import { User } from '../../entity/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export const login = async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  console.log(userName, password);

  try {
    let error: any = {};

    if (isEmpty(userName)) error.userName = '사용자 이름은 비워둘 수 없습니다.';
    if (isEmpty(password)) error.password = '비밀번호는 비워둘 수 없습니다.';

    if (Object.keys(error).length > 0) {
      return res.status(400).json(error);
    }

    //유저 확인 (유저 이름)
    const user = await User.findOneBy({ username: userName });

    //에러삽입
    if (!user)
      return res.status(400).json({ userName: '등록된 사용자가 없습니다. ' });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res
        .status(400)
        .json({ password: '비밀번호가 일치하지 않습니다.' });
    }

    const token = jwt.sign({ userName }, process.env.JWT_SECRET);

    //브라우저 쿠키에 저장
    //추가적인 쿠키 옵션을 설정할 수 있다. 브라우저 cookie 에 저장됨.
    res.set(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      })
    );

    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
