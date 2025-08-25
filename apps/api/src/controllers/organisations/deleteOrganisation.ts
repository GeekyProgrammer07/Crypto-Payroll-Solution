import { Response } from "express";
import { deleteOrganisationSchema } from "@crypto-payroll/types";
import { treeifyError } from "zod";
import prisma from "../../utils/prismaClient";
import { AuthRequest } from "../../types/authRequestInterface";

export const deleteOrganisaion = async (req: AuthRequest, res: Response) => {
    const parsedInputs = deleteOrganisationSchema.safeParse(req.body);

    if (!parsedInputs.success) {
        const errors = treeifyError(parsedInputs.error);
        return res.status(400).json({ errors });
    }

    try {
        const org = await prisma.organisation.findUnique({
            where: {
                id: parsedInputs.data.id
            }
        })

        if (!org) {
            return res.status(404).json({ message: "Organisation not found" });
        }

        if (org.ownerId !== req.user?.id) {
            return res.status(403).json({ message: "You are not allowed to delete this organisation" });
        }

        await prisma.organisation.delete({
            where: {
                id: org.id
            }
        })

        return res.status(200).json({
            orgId: org.id,
            message: "Organisation deleted successfully",
        });
    } catch (error: any) {
        console.error("Organisation deletion failed:", error);

        if (error.code === "P2025") {
            return res.status(404).json({ message: "Organisation not found" });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
};