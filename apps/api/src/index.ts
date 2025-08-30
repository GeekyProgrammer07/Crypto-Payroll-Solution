import express, { Request, Response } from 'express';
import 'dotenv/config';
import { get } from '@crypto-payroll/config';
import connectionToDb from './utils/connectionToDatabase';
import { setupGracefulShutdown } from './utils/gracefulShutdown';
import { mainRouter } from './routes/mainRouter';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


const environment = 'default';
export const currentConfig = get(environment);

process.env.DATABASE_URL = currentConfig.DATABASE;

app.use('/api/v1', mainRouter);

app.get('/', (_: Request, res: Response) => {
  res.send('Server is Healthy');
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Not Found"
  });
});

app.use((err: any, req: Request, res: Response, next: any) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    message: "Internal Server Error"
  });
});

app.listen(currentConfig.PORT, () => {
  console.log(`Server is Online`);
});

connectionToDb();
setupGracefulShutdown();