"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "~/lib/db";

interface IData {
  description: string;
  date: Date;
  link: string;
  active: boolean;
}

const BannerServerAction = async (data: IData) => {
  try {
    const session = await getServerSession();
    if (!session) {
      return;
    }
    if (!session.user) {
      return;
    }
    if (session.user.email === null) {
      return;
    }
    if (!session.user.email) {
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

    const { description, active, date, link } = data;

    const formData = z.object({
      description: z.string(),
      active: z.boolean(),
      date: z.date(),
      link: z.string(),
    });

    const isValidData = formData.parse({
      description,
      active,
      date,
      link,
    });

    if (!isValidData) {
      return {
        error: "Invalid Data",
      };
    }

    // Convert date to UTC
    const dateInUTC = new Date(
      Date.UTC(
        isValidData.date.getFullYear(),
        isValidData.date.getMonth(),
        isValidData.date.getDate(),
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
          description: isValidData.description,
          date: dateInUTC,
          link: isValidData.link,
          active: isValidData.active,
        },
      });
      // Revalidate the path after creating or updating the banner
      revalidatePath("/");
      return {
        message: "Banner Updated",
      };
    } else {
      const { description, active, date, link } = data;

      const formData = z.object({
        description: z.string(),
        active: z.boolean(),
        date: z.date(),
        link: z.string(),
      });

      const isValidData = formData.parse({
        description,
        active,
        date,
        link,
      });

      if (!isValidData) {
        return {
          error: "Invalid Data",
        };
      }
      // Create new banner
      await db.banner.create({
        data: {
          description: isValidData.description,
          date: dateInUTC,
          link: isValidData.link,
          active: isValidData.active,
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
