"use server";

import prisma from "@/lib/prisma";

export const getCategory = async () => {
  const categories = await prisma.category.findMany({
    include: {
      products: true,
    },
  });
  return categories;
};
