import { settings } from "./settings";

export const defaultCookieOptions = {
  httpOnly: true,
  secure: settings.env === "prod",
  sameSite: "strict",
  path: "/",
  maxAge: 1000 * 60 * 60 * 24,
} as const
