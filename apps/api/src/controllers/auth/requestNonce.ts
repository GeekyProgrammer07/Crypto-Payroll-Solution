export const requestNonce = () => {
    
}

// import crypto from "crypto";
// import prisma from "../../utils/prismaClient";

// export const requestNonce = async (req, res) => {
//   const { address } = req.body;
//   const nonce = crypto.randomBytes(16).toString("hex");

//   await prisma.user.update({
//     where: { id: req.user.id },
//     data: { walletNonce: nonce }  // add walletNonce column to your User model
//   });

//   res.json({ nonce });
// };
