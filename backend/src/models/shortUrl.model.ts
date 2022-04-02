import mongoose, { Document } from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwzyx0987654321", 6);

export interface ShortURL extends Document {
  shortId: string;
  destination: string;
  callsCount: number;
}

// todo: deal with duplication
const schema = new mongoose.Schema({
  shortId: {
    type: String,
    unique: true,
    required: true,
    default: () => nanoid(),
  },
  destination: {
    type: String,
    required: true,
    unique: true,
  },
  callsCount: {
    type: mongoose.Schema.Types.Number,
    ref: "count",
    required: true,
  },
});
const shortUrl = mongoose.model<ShortURL>("shortUrl", schema);
export default shortUrl;
