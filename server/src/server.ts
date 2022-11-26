import express from 'express';
import morgan from 'morgan';
import { AppDataSource } from './data-source';

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_, res) => res.send('running'));

app.listen(PORT, async () => {
  console.log(`Server running at ${PORT} port`);

  AppDataSource.initialize()
    .then(() => {
      console.log('DB initialized');
    })
    .catch((error) => console.log(error));
});
