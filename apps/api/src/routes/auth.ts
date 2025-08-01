import { Router } from "express";
import signUp from "../controllers/auth/signup";
import signIn from "../controllers/auth/signin";
import { authenticate } from "../middleware/authenticate";
import userInfo from "../controllers/auth/userInfo";

export const authRouter: Router = Router();

authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);
authRouter.get('/me', authenticate, userInfo);

//May be later
// POST /auth/logout – To destroy the session.
// POST /auth/refresh – To refresh tokens if using JWT.