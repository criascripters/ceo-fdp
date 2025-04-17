import express, { NextFunction, Request, Response } from "express";
import Message from "./models/Message";
import PastMessages from "./models/PastMessages";
import { getDiscordToken } from "./utils/getDiscordToken";
import { getDiscordUserInfo } from "./utils/getDiscordUserInfo";
import { getGeo } from "./utils/getGeo";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "hello world",
  });
});

router.get("/db", async (req: Request, res: Response) => {
  try {
    const message = await Message.find();
    res.json(message);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getLastMessage", async (req: Request, res: Response) => {
  try {
    const message = await Message.findOne().sort({ _id: 1 });
    if (message) {
      console.log(message);
      message.sentAt = new Date();
      const pastMessages = await PastMessages.create(message.toJSON());
      await Message.deleteOne({ _id: message._id });
    }
    res.json(message);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getPastMessages", async (req: Request, res: Response) => {
  try {
    const message = await PastMessages.find();
    res.json(message);
  } catch (error) {
    console.log(error);
  }
});

router.post("/addMessage", async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("request:" + req.body);
    const rawIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const ip = typeof rawIp === "string" ? rawIp.split(",")[0].trim() : rawIp;
    console.log("IP do usuário:", ip);

    const geo = await getGeo(ip as string);
    const token = req.cookies.token;
    const user = await getDiscordUserInfo(token);

    console.log("geo: ", geo);

    const message = await Message.create({
      message: req.body.message,
      name: req.body.name,
      targets: req.body.targets,
      ip: ip,
      userCountry: geo.country,
      userRegionName: geo.regionName,
      userCity: geo.city,
      userISP: geo.isp,
      userOrg: geo.org,
    });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

router.post("/auth/discord", async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const params = new URLSearchParams();
    params.append("client_id", process.env.DISCORD_CLIENT_ID as string);
    params.append("client_secret", process.env.DISCORD_CLIENT_SECRET as string);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", process.env.DISCORD_REDIRECT_URI as string);

    const token = await getDiscordToken(code);
    res.cookie("token", token, { httpOnly: true }).status(200).send("OK");
  } catch (error) {
    console.log(error);
  }
});

export default router;
