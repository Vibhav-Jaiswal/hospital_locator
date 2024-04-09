import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, resp, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All filds are required"));
  }

  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashPassword });

  try {
    await newUser.save();
    resp.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, resp, next) => {
  const { email, password } = req.body;
  
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All filds are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Password"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    const { password: pass, ...rest } = validUser._doc;

    resp
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
