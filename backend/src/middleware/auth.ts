import { NextFunction, Request, Response } from "express";

export let authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let token = req
}