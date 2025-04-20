import express, { NextFunction, Request, Response } from "express";
import { OAuthToken } from "./@types/token";
import Message from "./models/Message";
import PastMessages from "./models/PastMessages";
import IsAdminService from "./services/users/is-admin";
import { defaultCookieOptions } from "./utils/defaultCookieOptions";
import { getDiscordToken } from "./utils/getDiscordToken";
import { getDiscordUserInfo } from "./utils/getDiscordUserInfo";
import { getGeo } from "./utils/getGeo";
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
  const isAdminService = new IsAdminService()

  try {
    // Validate through access token (from cookies)
    const cookieToken = req.cookies?.token
    if (typeof cookieToken === "string" && cookieToken !== "") {
      const isAdmin = await isAdminService.execute(cookieToken)
      if (isAdmin !== null) {
        res.cookie("is_admin", isAdmin, defaultCookieOptions).status(200).send({ isAdmin })
        return
      }
    }

    // Validate through oauth code (from body)
    const { code } = req.body;
    console.log("### code: ", code);
    if (!code) {
      res.status(400).send("Missing code.");
      return;
    }

    try {
      const token = await getDiscordToken(code);
      const isAdmin = await isAdminService.execute(token.access_token);
      res
        .cookie("token", token.access_token, defaultCookieOptions)
        .cookie("is_admin", isAdmin, defaultCookieOptions)
        .status(200)
        .send({ isAdmin });
    } catch (err: unknown) {
      res.status(401).send(err instanceof Error ? err.message : "Código inválido.");

      return;
    }
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
