"use server";
import prisma from "@/lib/prisma";

export const deleteProduct = async (id: number) => {
  const result = await prisma.product.delete({
    where: {
      id: id,
    },
  });
  return result;
};
