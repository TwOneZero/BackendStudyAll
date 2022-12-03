import { Request, Response } from 'express';

export const me = async (_: Request, res: Response) => {
  return res.json(res.locals.user);
};
