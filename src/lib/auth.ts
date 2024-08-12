import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { compare } from "bcrypt";
import { db } from "~/lib/db";
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const existingUser = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!existingUser) {
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password,
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: existingUser.id + "",

          email: existingUser.email,
        };
      },
    }),
  ],
};

// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import {
//   DefaultUser,
//   getServerSession,
//   type DefaultSession,
//   type NextAuthOptions,
// } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import DiscordProvider from "next-auth/providers/discord";

// import { env } from "~/env";
// import { db } from "./db";
// import { ReceiptText } from "lucide-react";
// import Email from "next-auth/providers/email";
// import { compare } from "bcrypt";

// /**
//  * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
//  * object and keep type safety.
//  *
//  * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
//  */
// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: number;
//       // ...other properties
//       // role: UserRole;
//     } & DefaultSession["user"];
//   }

//   interface User extends DefaultUser {
//     id: number;
//   }
// }

// /**
//  * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
//  *
//  * @see https://next-auth.js.org/configuration/options
//  */
// export const authOptions: NextAuthOptions = {
//   pages: {
//     signIn: "/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   // callbacks: {
//   //   session: async ({ session, user }) => {
//   //     console.log("session check callback", session, user);
//   //     const userAuth = await db.user.findFirst({
//   //       where: {
//   //         email: {
//   //           equals: session.user.email as string,
//   //           mode: "insensitive",
//   //         },
//   //       },
//   //     });
//   //     if (session.user && userAuth) {
//   //       session.user.id = userAuth.id;
//   //     }
//   //     return session;
//   //   },
//   // },

//   adapter: PrismaAdapter(db),
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "credentials",
//       credentials: {
//         email: {
//           label: "Email*",
//           type: "email",
//           placeholder: "Enter your email id",
//         },
//         password: {
//           label: "Password*",
//           type: "password",
//           placeholder: "Enter your password",
//         },
//       },

//       async authorize(credentials) {
//         if (!credentials) {
//           return null;
//         }

//         const user = await db.user.findFirst({
//           select: {
//             id: true,
//             email: true,
//             // phoneNumber: true,
//             password: true,
//           },
//           where: {
//             email: credentials.email,
//           },
//         });

//         console.log("login request", user, credentials.email);

//         if (!user) {
//           return null;
//         }
//         if (!user.password) {
//           return null;
//         }

//         const isValid = await compare(credentials.password, user.password);
//         if (!isValid) {
//           return null;
//         }
//         console.log("user find", user);
//         return {
//           id: user.id,
//           email: user.email,
//           //   phoneNumber: user.phoneNumber,
//         };
//       },
//     }),
//   ],
// };

// /**
//  * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
//  *
//  * @see https://next-auth.js.org/configuration/nextjs
//  */
// export const getServerAuthSession = () => getServerSession(authOptions);
