import express from 'express';
import { hello, signUp } from '../controllers/signUp';

export const authRouter = express.Router();

authRouter.post('/signup', signUp);