import { NextFunction, Request, Response } from "express";
import { settings } from "../utils/settings";

export function apiAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;

  if (!auth || auth !== `Bearer ${settings.apiSecret}`) {
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
}
