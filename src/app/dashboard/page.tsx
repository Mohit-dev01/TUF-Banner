import DashboardForm from "./dashboard-form";
import { db } from "~/lib/db";
import Link from "next/link";
import { authOptions } from "~/lib/auth";
import { getServerSession } from "next-auth";

const Dashboard = async () => {
  // const session = await getServerSession(authOptions);
  const session = await getServerSession();
  console.log(session);
  if (!session) {
    return (
      <div>
        {/* <Link
          className="mt-10 flex flex-wrap items-center justify-center text-blue-500"
          href="/login"
        >
          {" "}
          Login Here to add the banner
        </Link> */}
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
        <div>
          <Link
            className="mt-10 flex flex-wrap items-center justify-center text-blue-500"
            href="/login"
          >
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

  // if (!data) {
  //   return;
  // }
  console.log(data);
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

// import DashboardForm from "./dashboard-form";
// import { db } from "~/lib/db";
// import Link from "next/link";
// import { getServerSession } from "next-auth";
// // import { authOptions } from "~/lib/auth";

// const Dashboard = async () => {
//   // Fetch the session
//   const session = await getServerSession();

//   // Redirect to login if the session is not found
//   if (!session?.user?.email) {
//     return (
//       <div>
//         <Link
//           className="mt-10 flex flex-wrap items-center justify-center text-blue-500"
//           href="/login"
//         >
//           Login Here to add the banner
//         </Link>
//       </div>
//     );
//   }

//   // Fetch the user from the database using the session email
//   const user = await db.user.findUnique({
//     where: {
//       email: session.user?.email!,
//     },
//   });

//   // Redirect to login if the user is not found
//   // if (!user) {
//   //   return (
//   //     <div>
//   //       <Link
//   //         className="mt-10 flex flex-wrap items-center justify-center text-blue-500"
//   //         href="/login"
//   //       >
//   //         Login Here to add the banner
//   //       </Link>
//   //     </div>
//   //   );
//   // }

//   // Fetch the banner data for the user
//   const data = await db.banner.findUnique({
//     where: {
//       userId: user?.id,
//     },
//   });
//   const convertToUTC = (date: Date) => {
//     if (!(date instanceof Date) || isNaN(date.getTime())) {
//       throw new Error("Invalid Date");
//     }
//     return new Date(
//       Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
//     );
//   };
//   // Render the dashboard form with the banner data
//   return (
//     <>
//       <DashboardForm
//         description={data?.description || ""}
//         link={data?.link || ""}
//         date={convertToUTC(data?.date!)}
//         active={data?.active || false}
//       />
//     </>
//   );
// };
