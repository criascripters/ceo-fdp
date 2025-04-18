import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import serverless from "serverless-http";
import "../database";
import router from "../routes";
var cookieParser = require("cookie-parser");

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 50,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use(express.json());
app.use(
  cors({
    origin: ["https://po.criascript.dev", "http://localhost:5173"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);
app.use("/", router);
app.set("trust proxy", true);
app.use(limiter);
app.use(cookieParser());

if (process.env.NODE_ENV === "dev") {
  app.listen(3000, () => {
    console.log("[ONLINE] Running on port 3000");
  });
}
export default app;

export const handler = serverless(app);
