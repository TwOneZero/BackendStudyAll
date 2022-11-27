import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { User } from '../entity/User';

//에러내용 정리해서 보여주기
const mapErrors = (errors: Object[]) => {
  return errors.reduce((prev: any, err: any) => {
    prev[err.property] = Object.entries(err.constraints)[0][1];
    return prev;
  }, {});
};

export const register = async (req: Request, res: Response) => {
  const { email, userName, password } = req.body;
  console.log(email, userName, password);

  try {
    let error: any = {};

    //유저 확인
    const checkEmail = await User.findOneBy({ email });
    const checkName = await User.findOneBy({ username: userName });

    //에러삽입
    if (checkEmail) error.email = '이미 존재하는 이메일 주소입니다.';
    if (checkName) error.userName = '이미 존재하는 사용자 이름입니다.';
    //에러가 존재한다면 ( 객체로 초기화 했기 때문에 Object.keys 로 배열로 바꿔줌)
    if (Object.keys(error).length > 0) {
      return res.status(400).json(error);
    }

    //정보대로 유저 생성
    const newUser = new User();
    newUser.email = email;
    newUser.username = userName;
    newUser.password = password;

    //class-validator 로 entity에 설정해 놓은 제약에 따른 유효성 검사해줌
    error = await validate(newUser);
    // console.log(error);

    //validate 의 error 내용은 배열로 반환됨.
    if (error.length > 0) {
      return res.status(400).json(mapErrors(error));
    }

    //유저 저장
    await newUser.save();
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
