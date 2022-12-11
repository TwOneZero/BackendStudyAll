import { Request, Response } from 'express';
import { Sub } from '../../entity/Sub';

export const getSub = async (req: Request, res: Response) => {
  const name = req.params.name;

  try {
    const sub = await Sub.findOneByOrFail({ name });
    return res.status(200).json(sub);
  } catch (error) {
    return res.status(404).json({ error: 'Sub 를 찾을 수 없습니다.' });
  }
};
