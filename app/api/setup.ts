import mongoose from "mongoose";

mongoose.connect(process.env.STRING!);

export const baclearn = mongoose.connection.useDb("baclearn");
