import { Router } from "express";
import signUp from "../controllers/authController/signup";
import signIn from "../controllers/authController/signin";

export const authRouter = Router();

authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);