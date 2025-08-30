import { AuthRequest } from "../../types/authRequestInterface";
import { Response } from "express";
import prisma from "../../utils/prismaClient";

export const getOrgDetails = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    const getDetails = await prisma.orgMember.findMany({
        where: {
            memberId: userId
        },
        select: {
            organisation: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })

    const organisations = getDetails.map(org => org.organisation);

    res.status(200).send({
        organisations
    })
}