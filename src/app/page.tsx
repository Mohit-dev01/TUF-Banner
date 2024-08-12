import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import CountdownTimer from "~/components/countDownTimer";
import { db } from "~/lib/db";

const Home = async () => {
  const session = await getServerSession();
  if (!session) {
    return (
      <div className="flex flex-col gap-2">
        <Link
          className="mt-10 flex flex-wrap items-center justify-center text-blue-500"
          href="/register"
        >
          {" "}
          Create an account to add the banner
        </Link>
      </div>
    );
  }
  if (!session.user) {
    return;
  }
  if (session.user.email === null) {
    return;
  }
  const user = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!user) {
    return (
      <>
        {/* <div className="flex flex-col gap-2">
          <Link
            className="mt-10 flex flex-wrap items-center justify-center text-blue-500"
            href="/register"
          >
            {" "}
            Create an account to add the banner
          </Link>
        </div> */}
      </>
    );
  }
  const banner = await db.banner.findUnique({
    select: {
      description: true,
      date: true,
      link: true,
    },
    where: {
      userId: user?.id,
      active: true,
    },
  });
  // console.log(new Date(banner?.date!));
  // console.log(banner)
  if (!banner) {
    return;
  }
  return (
    <div>
      <CountdownTimer
        link={banner.link}
        targetDate={new Date(banner.date)}
        description={banner.description}
      />
    </div>
  );
};

export default Home;
