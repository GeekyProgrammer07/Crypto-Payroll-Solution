import express from 'express'
import { authRouter } from './authRouter';

export const mainRouter = express.Router();

mainRouter.route('/auth', authRouter);
// mainRouter.route('/invoices', invoicesRouter);
// mainRouter.route('/payments', paymentsRouter);
// mainRouter.route('/users', usersRouter);
// mainRouter.route('/dashboard', dashboardRouter);
