import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";

// Mirrors Amanavest2.0 lib/auth/options.ts so both sites accept and reject the
// same accounts with the same messages.
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectToDatabase();
        const user = await User.findOne({ email: credentials.email.toLowerCase().trim() }).lean();
        if (!user?.password) return null;

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;

        if (user.deleted || user.status === "Deleted") {
          throw new Error("This account has been deleted. Contact info@amanavest.com if you'd like it restored.");
        }
        if (user.status === "Email") {
          throw new Error("Please verify your email before signing in. Check your inbox for the verification link.");
        }
        if (user.status === "Review") {
          throw new Error("Your account is under review. You will be able to sign in once an admin approves it.");
        }
        if (user.status !== "Active") {
          throw new Error("Your account is not active. Please contact support.");
        }

        await User.updateOne({ userid: user.userid }, { lastlogin: new Date().toISOString() });

        return {
          id: user.userid,
          email: user.email,
          name: user.name,
          type: user.type,
          status: user.status,
          title: user.title || "",
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userid = user.id;
        token.type = user.type;
        token.status = user.status;
        token.title = user.title;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userid as string;
        session.user.type = token.type as string;
        session.user.status = token.status as string;
        session.user.title = token.title as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
