import express, { NextFunction, Request, Response } from "express";
import { OAuthToken } from "./@types/token";
import Message from "./models/Message";
import PastMessages from "./models/PastMessages";
import { getDiscordToken } from "./utils/getDiscordToken";
import { getDiscordUserInfo } from "./utils/getDiscordUserInfo";
import { getGeo } from "./utils/getGeo";
import { settings } from "./utils/settings";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "hello world",
  });
});

router.get("/messages", async (req: Request, res: Response) => {
  try {
    const message = await Message.find().select("name message createdAt");
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
    const cookieToken: OAuthToken = req.cookies?.token;

    if (!cookieToken) {
      res.status(401).send("Token not found");
      return;
    }

    const discordUser = await getDiscordUserInfo(cookieToken.access_token);
    console.log("discordUser: ", discordUser);

    const { id, username, email, verified } = discordUser;

    const rawIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const ip = typeof rawIp === "string" ? rawIp.split(",")[0].trim() : rawIp;
    console.log("IP do usuário:", ip);

    const geo = await getGeo(ip as string);

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
      discordUser: { id, username, email, verified },
    });
    console.log("message: ", message);
    res.json(message);
  } catch (error) {
    console.log(error);
  }
});

router.post("/auth/discord", async (req: Request, res: Response) => {
  try {
    // Validate through access token (from cookies)
    const cookieToken: OAuthToken = req.cookies?.token;
    if (cookieToken !== null) {
      try {
        console.log("COOKIEEEE$$$$$:", cookieToken);
        await getDiscordUserInfo(cookieToken.access_token);
        res.status(200).send("OK");

        return;
      } catch (error) {
        console.error(error);
      }
    }

    // Validate through oauth code (from body)
    const { code } = req.body;
    console.log("### code: ", code);
    if (!code) {
      res.status(400).send("Missing code.");
      return;
    }

    const token = await getDiscordToken(code);
    if (!token) {
      res.status(401).send(token);
      return;
    }

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: settings.env === "prod",
        sameSite: "strict",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24,
      })
      .status(200)
      .send("OK");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

router.get("/test", async (req: Request, res: Response) => {
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    res.status(401).send("Não autenticado");
  }

  res.send("Autenticado com token: " + token);
});

export default router;
