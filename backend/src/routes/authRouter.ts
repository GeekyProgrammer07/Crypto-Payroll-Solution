import { Router } from "express";
import { signUp } from "../controllers/authController/signup";

export const authRouter = Router();

authRouter.post('/signup', signUp);