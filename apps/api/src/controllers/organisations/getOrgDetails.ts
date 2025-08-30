import { AuthRequest } from "../../types/authRequestInterface";
import { Response } from "express";
import prisma from "../../utils/prismaClient";

export const getOrgDetails = (req: AuthRequest, res: Response) => {
    // const getDetails = await prisma.
}