import DashboardForm from "./dashboard-form";
import { db } from "~/lib/db";
import Link from "next/link";
import { authOptions } from "~/lib/auth";
import { getServerSession } from "next-auth";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    return (
      <div>
        <Link
          className="mt-10 flex flex-wrap items-center justify-center text-blue-500"
          href="/login"
        >
          {" "}
          Login Here to add the banner
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
        {/* <div>
          <Link
            className="mt-10 flex flex-wrap items-center justify-center text-blue-500"
            href="/login"
          >
            {" "}
            Login Here to add the banner
          </Link>
        </div> */}
      </>
    );
  }
  const data = await db.banner.findUnique({
    where: {
      userId: user?.id!,
    },
  });

  // if (!data) {
  //   return;
  // }

  return (
    <>
      <DashboardForm
        description={data?.description!}
        link={data?.link!}
        date={data?.date!}
        active={data?.active!}
      />
    </>
  );
};
export default Dashboard;
