"use server";
import prisma from "@/lib/prisma";
const postOrder = async (data: any) => {
  try {
    const order = await prisma.order.create({
      data: {
        ...data,
      },
    });
    return order;
  } catch (error) {
    console.error({ error });
  }
};
export default postOrder;
