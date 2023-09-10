import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: null,

      async authorize(credentials: any) {
        const { email, password } = credentials;

        //========== Check user =======
        const user: any = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user)
          throw new Error("No user found with email. Please register.");

        //========= Compare =========
        const checkPassword = await compare(password, user.password || "");

        if (!checkPassword || user.email !== email) {
          throw new Error("Username or password is incorrect.");
        }

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token }) {
      const users = await prisma.user.findUnique({
        where: {
          email: token.email,
        },
      });
      delete users.password;
      users && (token.user = users);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
