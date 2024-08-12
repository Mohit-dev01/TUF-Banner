import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { SessionProvider } from "next-auth/react";
// import { TRPCReactProvider } from "~/trpc/react";
import Header from "~/components/header";
import { Toaster } from "~/components/ui/toaster";
import Link from "next/link";
import { getServerSession } from "next-auth";
import SessionProviderClientComponent from "~/components/clientWrapper";
// import { getServerSession } from "next-auth";
export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession();
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        {/* <TRPCReactProvider> */}
          <SessionProviderClientComponent session={session}>
            {" "}
            <Header />
            {children}
            <div className="mt-10 flex flex-col items-center justify-center font-bold">
              Made by Mohit Wadhwa
              <div className="flex gap-2">
                {" "}
                <Link href="https://www.linkedin.com/in/mohit0100/">
                  Linkedin
                </Link>
                <Link href="https://github.com/Mohit-dev01">Github</Link>
                <Link href="mailTo:mohitwadhwa7788@gmail.com">Mail</Link>
              </div>
            </div>
            <Toaster />
          </SessionProviderClientComponent>
        {/* </TRPCReactProvider> */}
      </body>
    </html>
  );
}

// import "~/styles/globals.css";
// import { GeistSans } from "geist/font/sans";
// import { type Metadata } from "next";

// import { TRPCReactProvider } from "~/trpc/react";
// import Header from "~/components/header";
// import Link from "next/link";
// import { Toaster } from "~/components/ui/toaster";
// export const metadata: Metadata = {
//   title: "Create T3 App",
//   description: "Generated by create-t3-app",
//   icons: [{ rel: "icon", url: "/favicon.ico" }],
// };

// export default async function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en" className={`${GeistSans.variable}`}>
//       <body>
//         {/* <ClientSessionProvider session={session}>
//           <TRPCReactProvider>
//             <Header />
//             {children}

//             <div className="mt-10 flex flex-col items-center justify-center font-bold">
//               Made by Mohit Wadhwa{" "}
//               <div className="flex gap-2">
//                 <Link href="https://www.linkedin.com/in/mohit0100/">
//                   LinkedIn
//                 </Link>
//                 <Link href="https://github.com/Mohit-dev01">GitHub</Link>
//                 <Link href="mailto:mohitwadhwa7788@gmail.com">Mail</Link>
//               </div>
//             </div>
//             <Toaster />
//           </TRPCReactProvider>
//         </ClientSessionProvider> */}
//         <TRPCReactProvider>
//           <Header />
//           {children}

//           <div className="mt-10 flex flex-col items-center justify-center font-bold">
//             Made by Mohit Wadhwa{" "}
//             <div className="flex gap-2">
//               <Link href="https://www.linkedin.com/in/mohit0100/">
//                 LinkedIn
//               </Link>
//               <Link href="https://github.com/Mohit-dev01">GitHub</Link>
//               <Link href="mailto:mohitwadhwa7788@gmail.com">Mail</Link>
//             </div>
//           </div>
//           <Toaster />
//         </TRPCReactProvider>
//       </body>
//     </html>
//   );
// }
