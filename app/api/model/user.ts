import mongoose from "mongoose";
import { baclearn } from "../setup";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  watchedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  postedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export const User = baclearn.model("User", userSchema);
