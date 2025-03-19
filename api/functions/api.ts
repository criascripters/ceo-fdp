import express, { Request, Response } from "express";
import serverless from "serverless-http";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
const router = express.Router();

async function main() {
  await prisma.$connect();
}

main().catch(console.error);

router.get("/", (req, res) => {
  res.json({
    message: "hello world",
  });
});

router.get("/test", async (req: Request, res: Response) => {
  await prisma.message.create({
    data: {
      message: "hello world",
      name: "aaa",
    },
  });

  res.json({
    message: "created",
    status: 200,
  });
});

app.use("/", router);
export const handler = serverless(app);
