"use server";
import prisma from "@/lib/prisma";
import { ProductType } from "@/types";
// import { ProductType } from "@/types";
import { slugify } from "@/utils/slugify";

const addProduct = async (values: ProductType) => {
  try {
    const { name, images, id, ...rest }: any = values;
    const newProduct = await prisma.product.create({
      data: {
        id,
        images,
        active: true,
        name,
        slug: slugify(name),
        ...rest,
      },
    });
    return newProduct;
  } catch (error) {
    console.log(error);
  }
};

export default addProduct;
