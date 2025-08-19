import { Router } from "express";
import signUp from "../controllers/auth/signup";
import signIn from "../controllers/auth/signin";
import { authenticate } from "../middleware/authenticate";
import userInfo from "../controllers/auth/userInfo";
import { signOut } from "../controllers/auth/signOut";
import { refresh } from "../controllers/auth/refresh";
import { requestNonce } from "../controllers/auth/requestNonce";
import { walletConnect } from "../controllers/auth/walletConnect";

export const authRouter: Router = Router();

authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);
authRouter.get('/me', authenticate, userInfo);
authRouter.post('/signout', authenticate, signOut);
authRouter.post('/refresh', refresh);
authRouter.post('/wallet/nonce', authenticate, requestNonce); //Todo 1
authRouter.post('/wallet/connect', authenticate, walletConnect) //Todo 2
