import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "admin_login",
      name: "admin_credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "username",
        },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials, req) => {
        //return a user or null if there are problems with the credentials
        //database lookup
        const admin = await prisma.admin.findUnique({
          where: {
            username: credentials.username,
          },
        });
        if (credentials.password === admin.password) {
          const adminObj = {
            id: admin.id,
            username: admin.username,
            role: admin.role,
          };
          return adminObj;
        } else {
          //login failed
          return null;
        }
      },
    }),
    //credentials for store
    CredentialsProvider({
      id: "store_login",
      name: "store_credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "username",
        },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials, req) => {
        //return a user or null if there are problems with the credentials
        //database lookup
        const store = await prisma.store.findUnique({
          where: {
            username: credentials.username,
          },
        });
        if (credentials.password === store.password) {
          const storeObj = {
            id: store.id,
            username: store.username,
            role: store.role,
          };
          return storeObj;
        } else {
          //login failed
          return null;
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
        token.user = user;
      }
      return token;
    },
    session: ({ token, session }) => {
      if (token) {
        session.id = token.id;
        session.role = token.role;
        session.user = token.user;
      }
      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  },
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
    verifyRequest: "/",
  },
});
