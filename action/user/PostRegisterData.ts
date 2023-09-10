"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

const postRegisterData = async (values: any) => {
  try {
    const hasPassword = await bcrypt.hash(values.password, 12);
    const newUser = await prisma.user.create({
      data: {
        ...values,
        password: hasPassword,
      },
    });
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

export default postRegisterData;
