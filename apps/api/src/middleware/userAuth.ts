import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/authRequestInterface";

export const userAuth = (req: AuthRequest, res: Response, next: NextFunction): any => {
  const isUser = req.user?.role === 'USER';
  if (isUser) {
    return next();
  } else {
    console.warn("Not an User");
    return res.status(403).json({ message: "Forbidden: Users only" });
  }
};