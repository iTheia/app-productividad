import { Router } from 'express';
import { authRoutes } from './routes/auth';

export const router: Router = Router();
router.use('/auth', authRoutes);
