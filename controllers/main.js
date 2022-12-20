import { asyncWrapper } from "../middleware/async.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { BadRequest } from "../errors/index.js";

dotenv.config();

export const login = asyncWrapper(async (req, res, next) => {
  const { username, password } = await req.body;
  if (!username || !password) {
    return next(new BadRequest("Both username and password must be provided!"));
  }

  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
});

export const dashboard = asyncWrapper(async (req, res, next) => {
  const userData = await req.user;
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${userData.username}`,
    secret: `Here is your authorized data ${luckyNumber}`,
  });
});
