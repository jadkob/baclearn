import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017");

export const baclearn = mongoose.connection.useDb("baclearn");
