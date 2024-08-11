"use server";

import { getServerSession } from "next-auth";
import { db } from "~/server/db";
import { hash } from "bcrypt";
import { useToast } from "~/components/ui/use-toast";

interface IData {
  email: string;
  password: string;
}
const RegisterAction = async (data: IData) => {
  const session = await getServerSession();

  try {
    const existingUser = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      return {
        message: "User already existed",
      };
    }

    const hashedPassword = await hash(data.password, 10);

    await db.user.create({
      data: {
        email: data.email,
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
