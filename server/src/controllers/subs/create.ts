import { isEmpty } from 'class-validator';
import { Request, Response } from 'express';
import { AppDataSource } from '../../../data-source';
import { Sub } from '../../entity/Sub';
import { User } from '../../entity/User';

const createSubs = async (req: Request, res: Response) => {
  const { subName, title, description } = req.body;

  //Sub가 존재하는 지 check
  try {
    let error: any = {};
    
    if (isEmpty(subName)) error.subName = '이름은 비워둘 수 없습니다.';
    if (isEmpty(title)) error.title = '제목은 비워둘 수 없습니다.';

    const sub = await AppDataSource.getRepository(Sub)
      .createQueryBuilder('sub')
      .where('lower(sub.name) = :name', { name: subName.toLowerCase() })
      .getOne();

    if (sub) error.subName = 'Sub가 이미 존재합니다.';
    if (Object.keys(error).length > 0) throw error;
  } catch (error) {
    return res.status(500).json(error);
  }

  //Sub 만들기 -> DB 저장
  try {
    const user: User = res.locals.user;
    const sub = new Sub();
    sub.name = subName;
    sub.title = title;
    sub.description = description;
    sub.user = user;
    await sub.save();

    return res.status(200).json(sub);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: 'Something went wrong for create subs' });
  }
};

export default createSubs;
