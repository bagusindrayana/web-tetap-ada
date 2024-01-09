import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler } from "next";
import { getIronSession } from "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    token?: string;
    flashMessage?: string;
  }
}

export const sessionOptions = {
  password: "86534545700272530335785129732443",
  cookieName: "my-cookie-name",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000
  },
};

