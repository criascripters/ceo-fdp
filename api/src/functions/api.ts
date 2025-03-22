import cors from "cors";
import express from "express";
import serverless from "serverless-http";
import "../database";
import router from "../routes";

const app = express();
app.use(express.json());
app.use(cors())
app.use("/", router);

if (process.env.NODE_ENV === "dev") {
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}

export default app;

export const handler = serverless(app);
