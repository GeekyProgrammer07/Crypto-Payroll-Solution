import express from 'express'
import { signUp } from '../controllers/signUp';

export const authRouter = express.Router();

authRouter.post('/signup', signUp)