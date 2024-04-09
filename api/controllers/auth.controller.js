import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const signup = async (req, resp) => {
  const { username, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashPassword });

  try {
    await newUser.save();
    resp.status(201).json("User created successfully");
  } catch (error) {
    resp.status(500).json(error.message);
  }
};
