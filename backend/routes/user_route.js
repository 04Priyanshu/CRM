import express from "express";
import { addUser, login, logout, getUserDetails } from "../controllers/user_controller.js";
import { authenticateUser } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.post("/adduser", addUser);
router.post("/login", login);
router.get("/me", authenticateUser, getUserDetails); // Fetch user details securely
router.post("/logout", logout);

export default router;
