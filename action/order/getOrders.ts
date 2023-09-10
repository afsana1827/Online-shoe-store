"use server";
import prisma from "@/lib/prisma";

export const getOrders = async () => {
  const orderData = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return orderData;
};
