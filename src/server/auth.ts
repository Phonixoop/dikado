import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";

import { db } from "~/server/db";

import CredentialsProvider from "next-auth/providers/credentials";

import type { Role, User as PrismaUser } from "@prisma/client";
import { createHash } from "crypto";
import { compareHashPassword, hashPassword } from "~/utils/util";
import { Permission, User } from "~/types";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: PrismaUser & { role?: Role };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        phonenumber: { label: "phonenumber", type: "text" },
        verificationCode: { label: "verificationCode", type: "text" },
      },
      //@ts-ignore
      async authorize(credentials: { phonenumber; verificationCode; session }) {
        // Add logic here to look up the user from the credentials supplied

        const user = await db.user.findFirst({
          where: {
            phonenumber: credentials.phonenumber,
          },
          include: {
            role: true,
            brands: true,
          },
        });

        if (credentials.session) {
          const session = JSON.parse(credentials.session);
          const loggedInUser = await db.user.findFirst({
            where: {
              username: session.username,
            },
            include: {
              role: true,
              brands: true,
            },
          });

          // if (loggedInUser.role?.permissions) {
          //   const permissions: Permission[] = JSON.parse(
          //     loggedInUser.role.permissions,
          //   );
          //   if (
          //     permissions.find((a) => a.id === "ManageUsers")?.isActive === true
          //   ) {
          //     return user;
          //   } else return;
          // }
        } else if (user) {
          if (user?.code === credentials.verificationCode) {
            return user;
          }
          // if (
          //   compareHashPassword(credentials.password, user.password).success
          // ) {
          //   return user;
          // }
          return undefined;
        } else {
          // uncomment to create a user for the first time
          // await db.user.create({
          //   data: {
          //     username: credentials.username,
          //     password: hashPassword(credentials.password),
          //   },
          // });
          return undefined;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async ({ session, token }: { session: any; token: any }) => {
      const user = await db.user.findUnique({
        where: { phonenumber: token.user.phonenumber },
        include: { role: true, brands: true },
      });
      session.user = user;
      return session;
    },
    jwt: async ({ token, user }: any) => {
      user && (token.user = user);
      delete token.user.code;
      return token;
    },
  },
  pages: {
    signIn: "/login", // this will allow us to use our own login page
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */

export const getServerAuthSession = () => getServerSession(authOptions);
// export const getServerAuthSession = (ctx: {
//   req: GetServerSidePropsContext["req"];
//   res: GetServerSidePropsContext["res"];
// }) => {
//   return getServerSession(ctx.req, ctx.res, authOptions);
// };
