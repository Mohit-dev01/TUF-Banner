"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";

interface IData {
  description: string;
  date: Date;
  link: string;
  active: boolean;
}

const BannerServerAction = async (data: IData) => {
  try {
    const session = await getServerSession();

    if (!session?.user.email) {
      throw new Error("User not authenticated");
    }

    // Find the user
    const user = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Log the date before conversion
    console.log("Date before conversion:", data.date);

    // Convert date to UTC
    const dateInUTC = new Date(
      Date.UTC(
        data.date.getFullYear(),
        data.date.getMonth(),
        data.date.getDate(),
      ),
    );

    // Log the converted date
    console.log("Date in UTC:", dateInUTC);

    // Check if a banner already exists for this user
    const existingBanner = await db.banner.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (existingBanner) {
      // Update existing banner
      await db.banner.update({
        where: {
          id: existingBanner.id,
        },
        data: {
          description: data.description,
          date: dateInUTC,
          link: data.link,
          active: data.active,
        },
      });
      // Revalidate the path after creating or updating the banner
      revalidatePath("/");
      return {
        message: "Banner Updated",
      };
    } else {
      // Create new banner
      await db.banner.create({
        data: {
          description: data.description,
          date: dateInUTC,
          link: data.link,
          active: data.active,
          user: {
            connect: { id: user.id },
          },
        },
      });
      // Revalidate the path after creating or updating the banner
      revalidatePath("/");
      return {
        message: "Banner Created",
      };
    }
  } catch (error) {
    throw new Error(`Error`);
  }
};

export default BannerServerAction;
