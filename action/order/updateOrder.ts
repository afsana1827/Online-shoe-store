"use server";
import prisma from "@/lib/prisma";
import { order } from "@prisma/client";

export const updateOrder = async (id: number, data: order) => {
  const result = await prisma.order.update({
    where: {
      id: id,
    },
    data,
  });

  return result;
};
