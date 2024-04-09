import express from "express";
import mongoose from "mongoose";
import dotenv, { config } from "dotenv";
import userRouter from "./routes/user.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5999;

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB!!"))
  .catch((err) => console.log(err));

app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
