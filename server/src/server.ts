import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { AppDataSource } from './data-source';

import authRouter from './routes/auth';
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(morgan('dev'));
//cors 설정
const origin = 'http://localhost:3000';
app.use(
  cors({
    origin,
    credentials: true,
  })
);

app.get('/', (_, res) => res.send('running'));

app.use('/api/auth', authRouter);

app.listen(PORT, async () => {
  console.log(`Server running at ${PORT} port`);

  AppDataSource.initialize()
    .then(() => {
      console.log('DB initialized');
    })
    .catch((error) => console.log(error));
});
