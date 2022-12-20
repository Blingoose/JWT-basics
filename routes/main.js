import express from "express";
import { login, dashboard } from "../controllers/main.js";
import { authMiddleware } from "../middleware/auth.js";
export const router = express.Router();

router.route("/login").post(login);
router.route("/dashboard").get(authMiddleware, dashboard);

export default router;
