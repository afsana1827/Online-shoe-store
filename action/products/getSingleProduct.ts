"use server";

import prisma from "@/lib/prisma";

export const getSingleProduct = async (id: Number) => {
  const sigleProduct = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  return sigleProduct;
};
