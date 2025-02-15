import { User } from "../models/user_model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const addUser = async (req, res) => {
  try {
    const {
      company,
      product,
      firstName,
      lastName,
      email,
      mobile,
      role,
      password,
    } = req.body;
    if (!(email && password && firstName && lastName && mobile && role)) {
      res.status(400).json({ message: "All input is required" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      company,
      product,
      firstName,
      lastName,
      email: email.toLowerCase(),
      mobile,
      role,
      password: hashedPassword,
    });

    console.log(firstName, lastName, email, mobile, role, password);
    return res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Error in creating user", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "All input is required",
      });
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const tokenData = {
        user_id: user._id,
        email: user.email,
      };

      const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      res.cookie("token", token, { httpOnly: true, sameSite: "strict" });

      return res.status(200).json({
        message: "User logged in successfully",
        success: true,
        user: user,
      });
    }
    return res.status(400).json({
      message: "Invalid credentials",
      success: false,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in logging in", success: false });
  }
};
