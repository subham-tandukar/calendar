import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
 
  interface Session {
    token,
    data: {
      token:any
    }
    error,
    user: {
      data:any
    }
    & DefaultSession["user"]
    }
}
