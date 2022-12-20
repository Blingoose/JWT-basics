import { asyncWrapper } from "./async.js";
import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

export const authMiddleware = asyncWrapper(async (req, res, next) => {
  const authHeader = await req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new UnauthenticatedError("Blabla, no authorization...."));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    return next(
      new UnauthenticatedError("Not authorized to access this route")
    );
  }
});
