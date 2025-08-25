import { Response } from "express";
import prisma from "../../utils/prismaClient";
import { AuthRequest } from "../../types/authRequestInterface";
import { addOrganisationSchema } from "@crypto-payroll/types";
import { treeifyError } from "zod";

export const addOrganisationController = async (req: AuthRequest, res: Response): Promise<any> => {
  const parsedInputs = addOrganisationSchema.safeParse(req.body);

  console.log("Inside Add Org");
  if (!parsedInputs.success) {
    const errors = treeifyError(parsedInputs.error);
    return res.status(400).json({ errors });
  }

  const data = await prisma.user.findUnique({
    where: {
      id: req.user?.id
    },
    select: {
      walletAddress: true,
    }
  })

  if (!data?.walletAddress) {
    return res.status(400).json({
      message: "Wallet Address is required to create an organisation"
    });
  }

  try {
    const org = await prisma.organisation.create({
      data: {
        ownerId: req.user!.id,
        name: parsedInputs.data.name,
      },
    });

    const orgMember = await prisma.orgMember.create({
      data: {
        orgId: org.id,
        memberId: req.user!.id,
        walletAddress: req.user!.walletAddress ?? "",
        role: 'ADMIN',
        addedById: req.user!.id
      }
    })

    return res.status(201).json({
      message: "Organisation created successfully",
      organisation: {
        orgId: org.id,
        name: org.name,
        owner: org.ownerId
      },
    });
  } catch (error: any) {
    console.error("Organisation Creation Failed full error:", JSON.stringify(error, null, 2));

    if (error.code === "P2002") {
      const target = error.meta?.target?.join(', ');
      console.log(error);
      return res.status(409).json({
        message: `A record with this ${target} already exists.`,
      });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};
