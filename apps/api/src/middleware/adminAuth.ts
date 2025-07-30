import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/authRequestInterface";

export const adminAuth = (req: AuthRequest, res: Response, next: NextFunction): any => {
  const isAdmin = req.user?.role === 'ADMIN';

  if (isAdmin) {
    return next();
  } else {
    console.warn("Not an admin user");
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
};