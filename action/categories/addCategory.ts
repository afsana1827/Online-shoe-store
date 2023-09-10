"use server";
import { CategoryType } from "@/components/dashboard/category/add-category";
import prisma from "@/lib/prisma";
import { slugify } from "@/utils/slugify";

const addCategory = async (values: CategoryType) => {
  try {
    const { name, ...rest } = values;
    const newCategory = await prisma.category.create({
      data: {
        name,
        active: true,
        slug: slugify(name),
        ...rest,
      },
    });
    return newCategory;
  } catch (error) {
    console.log(error);
  }
};
export default addCategory;
