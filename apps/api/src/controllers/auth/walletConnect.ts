// export const walletConnect = () => {

// }


// import { ethers } from "ethers";
// import prisma from "../../utils/prismaClient";

export const walletConnect = (req: any, res:  any) => {

}
  // const { address, signature } = req.body;

  // const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  // if (!user?.walletNonce) {
  //   return res.status(400).json({ message: "Request nonce first" });
  // }

  // const recovered = ethers.verifyMessage(`Login nonce: ${user.walletNonce}`, signature);

  // if (recovered.toLowerCase() !== address.toLowerCase()) {
  //   return res.status(401).json({ message: "Signature verification failed" });
  // }

  // // Save the verified wallet
  // await prisma.user.update({
  //   where: { id: req.user.id },
  //   data: { walletAddress: address, walletNonce: null } // clear nonce
  // });

  // res.json({ message: "Wallet connected successfully" });
// };
