import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { SessionProvider } from "next-auth/react";
// import { TRPCReactProvider } from "~/trpc/react";
import Header from "~/components/header";
import { Toaster } from "~/components/ui/toaster";
import Link from "next/link";
import { getServerSession } from "next-auth";
import SessionProviderClientComponent from "~/components/client-wrapper";
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
              <Link
                className="text-blue-400 underline"
                href="https://www.linkedin.com/in/mohit0100/"
              >
                Linkedin
              </Link>
              <Link
                className="text-blue-400 underline"
                href="https://github.com/Mohit-dev01"
              >
                Github
              </Link>
              <Link
                className="text-blue-400 underline"
                href="mailTo:mohitwadhwa7788@gmail.com"
              >
                Mail
              </Link>
            </div>
          </div>
          <Toaster />
        </SessionProviderClientComponent>
        {/* </TRPCReactProvider> */}
      </body>
    </html>
  );
}
