import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

//router
import postRouter from './routes/post.js';
import userRouter from './routes/user.js';

const app = express();
app.set('port', process.env.PORT || 5000);

//공통 미들웨어
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use(morgan('dev'));

//몽고DB 연결
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('mongoDB connected!'))
  .catch((error) => console.log(error));

//라우팅
app.use('/posts', postRouter);
app.use('/user', userRouter);

//url 에러
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

//서버 에러
app.use((err, req, res, next) => {
  console.log('Server ERROR!');
  res.status(err.status || 500).json({message: err.message});
});

//서버 구동
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
