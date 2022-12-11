import { Request, Response } from 'express';
import { unlinkSync } from 'fs';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Sub } from '../../entity/Sub';
import { makeId } from '../../utils/helpers';

export const upload = multer({
  storage: multer.diskStorage({
    destination: 'public/images',
    filename: (_, file, callback) => {
      const name = makeId(15);
      callback(null, name + path.extname(file.originalname));
    },
  }),
  fileFilter: (_, file: any, callback: FileFilterCallback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      callback(null, true);
    } else {
      callback(new Error('지원하지 않는 이미지 형식입니다.'));
    }
  },
});

export const uploadSubImage = async (req: Request, res: Response) => {
  const sub: Sub = res.locals.sub;
  try {
    //client 에서 Formdata.append 로 보내줬음
    const type = req.body.type;
    //파일 유형 지정 X -> 업로드 된 파일 삭제
    if (type !== 'image' && type !== 'banner') {
      if (!req.file?.path) {
        return res.status(400).json({ error: '유효하지 않은 파일' });
      }
      //파일 지우기
      unlinkSync(req.file.path);
      return res.status(400).json({ error: '잘못된 유형' });
    }
    let oldImageUrn: string = '';

    if (type === 'image') {
      //사용중인 Urn 을 저장 -> 이전 파일 삭제 위함
      oldImageUrn = sub.imageUrn || '';
      //새로운 파일 이름을 넣어줌
      sub.imageUrn = req.file?.filename || '';
    } else if (type === 'banner') {
      oldImageUrn = sub.bannerUrn || '';
      sub.bannerUrn = req.file?.filename || '';
    }
    await sub.save();

    //oldImage 파일 삭제
    if (oldImageUrn !== '') {
      const fullFilename = path.resolve(
        process.cwd(),
        'public',
        'images',
        oldImageUrn
      );
      unlinkSync(fullFilename);
    }
    return res.status(200).json(sub);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: '이미지 업로드 문제 발생' });
  }
};
