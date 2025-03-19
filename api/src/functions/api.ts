import serverless from "serverless-http";
import express, { Request, Response } from "express";
import router from "../routes";
import "../database";

const app = express();
app.use(express.json());
app.use("/", router);

export default app;

export const handler = serverless(app);
