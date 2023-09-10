"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updatedManyProduct = async (values: any[]) => {
  try {
    if (values) {
      for (let item of values) {
        await prisma.product.update({
          where: {
            id: item.id,
          },
          data: {
            sizes: item.sizes.map((size) => {
              if (size.size === item.selectedSize) {
                return {
                  ...size,
                  quantity: size.quantity - item.quantity,
                };
              }
              return size;
            }),
          },
        });
      }
    }
    revalidatePath("/");
    return true;
  } catch (error) {
    console.log(error);
  }
};
