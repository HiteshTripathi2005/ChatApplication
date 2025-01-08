import express from "express";
import {
  getMessage,
  getUserForSlider,
  sendMessage,
} from "../controllers/message.controller.js";
import auth from "./../middlewares/auth.js";

const router = express.Router();

router.route("/friends").get(auth, getUserForSlider);
router.route("/:id").get(auth, getMessage);
router.route("/send/:id").post(auth, sendMessage);

export default router;
