import { Router } from 'express';

export const router = Router();

router.get('/healthcheck', (req, res) => {
  res.json({ status: 'OK' });
});
