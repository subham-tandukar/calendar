import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
 
  interface Session {
    data: {
      token:any
      
 } & DefaultSession["user"]
  }
}
