"use server";

import prisma from "@/lib/prisma";

export const getProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
  });

  return products;
};

export const getProductsByCategoryId = async (id: number) => {
  const products = await prisma.product.findMany({
    where: {
      categoryId: id,
    },
    take: 7,
  });

  return JSON.stringify(products);
};

// export const getAllProductsByCart = async (ids: number[]) => {
//   return await prisma.product.findMany({
//     where: {
//       id: {
//         in: [...ids],
//       },
//     },
//   });
// };
