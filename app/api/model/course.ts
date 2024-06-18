import mongoose from "mongoose";
import { baclearn } from "../setup";

const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  likes: { type: Number, default: 0 },
  likedUsers: [String],
  ytLink: String,
  watchedUsers: [String],
  createdAt: { type: Date, default: Date.now },
});

export const Course = baclearn.model("Course", courseSchema);
