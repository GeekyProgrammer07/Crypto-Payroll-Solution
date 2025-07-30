import prisma from "./prismaClient";


const connectionToDb = async () => {
  try {
    const users = await prisma.user.findMany();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database Connection Error:', error);
  }
};

export default connectionToDb;
