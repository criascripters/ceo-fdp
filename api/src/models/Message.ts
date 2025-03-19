import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: String,
  name: String,
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model("messages", messageSchema);

export default Message;
