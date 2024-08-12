"use server";

import { getServerSession } from "next-auth";
import { db } from "~/lib/db";
import { hash } from "bcrypt";
import { useToast } from "~/components/ui/use-toast";
import { z } from "zod";

interface IData {
  email: string;
  password: string;
}
const RegisterAction = async (data: IData) => {
  // const session = await getServerSession();
  // if (!session) {
  //   return {
  //     error: "Unauthorise",
  //   };
  // }
  const { email, password } = data;
  const formData = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  const isValidData = formData.parse({ email, password });
  if (!isValidData) {
    return {
      error: "Invalid Data",
    };
  }
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email: isValidData.email,
      },
    });

    if (existingUser) {
      return {
        message: "User already existed",
      };
    }

    const hashedPassword = await hash(isValidData.password, 10);

    await db.user.create({
      data: {
        email: isValidData.email,
        password: hashedPassword,
      },
    });
    return {
      message: "user created",
    };
  } catch (error) {
    console.log("error", error);
    throw new Error("Error");
  }
};
export default RegisterAction;
