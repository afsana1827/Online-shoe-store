"use server";
import prisma from "@/lib/prisma";

export const getMyOrders = async (userId) => {
  const orderData = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId,
    },
  });
  return orderData;
};
