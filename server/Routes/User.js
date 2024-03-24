import { Login, Register, Logout, Profile } from "../controllers/User.js";
import express from "express";
import { isAuth } from "../middlewars/isAuth.js";
const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);
router.post("/logout", Logout);
router.get("/", isAuth, Profile);

export default router;
