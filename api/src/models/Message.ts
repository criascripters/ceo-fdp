import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: String,
  name: { type: [String], index: true },
  sentAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  targets: [{ type: String }],
  ip: String,
});

const Message = mongoose.model("messages", messageSchema);

export default Message;
