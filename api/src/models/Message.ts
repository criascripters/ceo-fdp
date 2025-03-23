import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: String,
  name: { type: [String], index: true },
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model("messages", messageSchema);

export default Message;
