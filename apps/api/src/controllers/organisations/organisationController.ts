import { Request, Response } from "express";
import prisma from "../../utils/prismaClient";
import { AuthRequest } from "../../types/authRequestInterface";
import { addOrganisationSchema } from "@crypto-payroll/types";

export const organisationController = async (req: AuthRequest, res: Response): Promise<any> => {
  const parsedInputs = addOrganisationSchema.safeParse(req.body);

  if (!parsedInputs.success) {
    const errors = parsedInputs.error.flatten();
    return res.status(400).json({ errors });
  }

  if (!req.user?.walletAddress) {
    return res.status(400).json({
      message: "Wallet Address is required to create an organisation"
    });
  }

  try {
    const org = await prisma.organisation.create({
      data: {
        ownerId: req.user.id,
        name: parsedInputs.data.name,
      },
    });

    return res.status(201).json({
      message: "Organisation created successfully",
      organisation: org,
    });
  } catch (error: any) {
    console.log("Organisation Creation Failed full error:", JSON.stringify(error, null, 2));

    if (error.code === "P2002") {
      const target = error.meta?.target?.join(', ');
      return res.status(409).json({
        message: `A record with this ${target} already exists.`,
      });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};
