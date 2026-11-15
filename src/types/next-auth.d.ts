import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    type?: string;
    status?: string;
    title?: string;
  }

  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      type: string;
      status: string;
      title: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userid?: string;
    type?: string;
    status?: string;
    title?: string;
  }
}
