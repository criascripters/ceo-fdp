import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: String,
  name: { type: [String], index: true },
  sentAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  targets: [{ type: String }],
  ip: String,
  userCountry: String,
  userRegionName: String,
  userCity: String,
  userISP: String,
  userOrg: String,
  discordUser: { id: String, username: String, email: String, verified: Boolean },
});

const PastMessages = mongoose.model("pastMessages", messageSchema);

export default PastMessages;
