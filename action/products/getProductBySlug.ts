import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
  });

  return product;
};
