import express, { Request, Response } from "express";
import Message from "./models/Message";

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
    const message = await Message.findOne().sort({ _id: -1 });
    if (message) {
      console.log(message);
      await Message.deleteOne({ _id: message._id });
    }
    res.json(message);
  } catch (error) {
    console.log(error);
  }
});

router.post("/addMessage", async (req: Request, res: Response) => {
  try {
    console.log("request:" + req.body);
    const message = await Message.create({
      message: req.body.message,
      name: req.body.name,
      targets: req.body.targets,
    });
    res.json(message);
  } catch (error) {
    console.log(error);
  }
});

router.patch("/messages/:id/mark-as-sent", async (req: Request, res: Response) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { sentAt: new Date() }, { new: true });
    res.json(message);
  } catch (error) {
    console.log(error);
  }
});

export default router;
