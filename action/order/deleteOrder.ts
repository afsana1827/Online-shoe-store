"use server";

import prisma from "@/lib/prisma";

export const deleteOrder = async (id: number) => {
  const result = await prisma.order.delete({
    where: {
      id: id,
    },
  });
  return result;
};
export const deleteOrderByPaymentId = async (id: string) => {
  try {
    const result = await prisma.order.deleteMany({
      where: {
        payment_id: id,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
