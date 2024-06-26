import express from "express";
import { sendMessage, getMessage } from "../controllers/message.controllers.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:receiverId", protectRoute, getMessage);
router.post("/send/:receiverId", protectRoute, sendMessage);

export default router;
