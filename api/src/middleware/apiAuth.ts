import { NextFunction, Request, Response } from "express";

export function apiAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;

  if (!auth || auth !== `Bearer ${process.env.API_SECRET}`) {
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
}
