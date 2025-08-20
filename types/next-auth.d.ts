import NextAuth from "next-auth";

// Extend the default User and Session types to include 'role'
declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user?: {
      role?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
