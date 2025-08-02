import express, { Request, Response } from 'express';
import 'dotenv/config';
import { get } from '@crypto-payroll/config';
import connectionToDb from './utils/connectionToDatabase';
import { setupGracefulShutdown } from './utils/gracefulShutdown';
import { mainRouter } from './routes/mainRouter';

const app = express();
app.use(express.json());

const environment = 'default';
const currentConfig = get(environment);

app.use('/api/v1', mainRouter);

app.get('/', (_: Request, res: Response) => {
  res.send('Server is Healthy');
});

app.listen(currentConfig.PORT, () => {
  console.log(`Server is Online at: http://localhost:${currentConfig.PORT}`);
});

connectionToDb();
setupGracefulShutdown();