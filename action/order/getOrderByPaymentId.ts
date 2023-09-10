"use server";

import prisma from "@/lib/prisma";

export const getOrderByPaymentId = async (id: string) => {
  try {
    const orderData = await prisma.order.findUnique({
      where: {
        payment_id: id,
      },
    });
    return orderData;
  } catch (error) {
    console.log(error);
  }
};
