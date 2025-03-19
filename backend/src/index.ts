import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { router as apiRouter } from './routes';
import { errorHandler } from './middleware/errorHandler';
import { config } from './config';

// Initialize logger
const logger = pino({
  level: config.logger.level,
  transport: config.nodeEnv === 'development' 
    ? { target: 'pino-pretty' }
    : undefined
});

const app: Express = express();
const port = config.port;

// Middleware
app.use(helmet());
app.use(cors());
app.use(pinoHttp({ logger }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRouter);

// Base route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Express + TypeScript Server' });
});

// Error handling
app.use(errorHandler);

// Start server
app.listen(port, () => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});