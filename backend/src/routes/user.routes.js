import express from "express";
import auth from "./../middlewares/auth.js";
import {
  authUser,
  login,
  logout,
  profileUpdate,
  register,
} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile").post(auth, upload.single("avatar"), profileUpdate);
router.route("/authuser").get(auth, authUser);

export default router;
