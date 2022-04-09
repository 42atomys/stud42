import { DefaultSession } from "next-auth";

export interface SessionType {
  session?: DefaultSession["user"];
  user?:    User;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export type Session = SessionType
}