"use server";

import prisma from "@/lib/prisma";

export const getCategoryBySlug = async (slug: string) => {
  const categories = await prisma.category.findUnique({
    where: {
      slug,
    },
    include: {
      products: true,
    },
  });
  return categories;
};
