import { getServerSession } from "next-auth";
import DashboardForm from "./dashboard-form";
import { db } from "~/server/db";
import Link from "next/link";

const Dashboard = async () => {
  const session = await getServerSession();

  const user = await db.user.findUnique({
    where: {
      email: session?.user.email!,
    },
  });
  if (!user) {
    return (
      <>
        <div>
          <Link className="flex items-center text-blue-500 justify-center flex-wrap mt-10" href="/login">
            {" "}
            Login Here to add the banner
          </Link>
        </div>
      </>
    );
  }
  const data = await db.banner.findUnique({
    where: {
      userId: user?.id!,
    },
  });

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
