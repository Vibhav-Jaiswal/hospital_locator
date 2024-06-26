import express from "express";
import mongoose from "mongoose";
import dotenv, { config } from "dotenv";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import path from 'path';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5999;
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use(express.json());

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB!!"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use((err, req, resp, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error!!";

    return resp.status(statusCode).json({
        success:false,
        statusCode,
        message
    })

})

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
