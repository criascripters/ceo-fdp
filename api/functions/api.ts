import express, { Request, Response } from "express";
import serverless from "serverless-http";

const app = express();
app.use(express.json());
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "hello world",
  });
});

app.use("/", router);
export const handler = serverless(app);
