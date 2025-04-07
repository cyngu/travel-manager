import express, { Express, Request, Response, Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { authRouter, healthcheckRouter } from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { config } from './configs';
import 'dotenv/config';

// Initialize logger
const logger = pino({
  level: config.logger.level,
  transport: config.nodeEnv === 'development' ? { target: 'pino-pretty' } : undefined,
});

const app: Express = express();
const port = config.port;
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(pinoHttp({ logger }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/healthcheck', healthcheckRouter);

app.use('/api', apiRouter);

// Base route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Express + TypeScript Server' });
});

// app.get('/users/:id', async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         id,
//       },
//     });

//     if (user) {
//       return res.json(user);
//     } else {
//       return res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'An error occurred while fetching the user' });
//   }
// });

// Error handling
app.use(errorHandler);

// Start server
app.listen(port, () => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});
