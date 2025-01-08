import uploadImage from "../utils/cloudinary.js";
import generateToken from "../utils/token.js";
import User from "./../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { fullName, userName, email, password } = req.body;

    if (!fullName || !userName || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const alreadyExists = await User.findOne({ email });

    if (alreadyExists) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const user = await User.create({
      fullName,
      userName,
      email,
      password,
    });

    if (!user) {
      return res.status(500).json({ message: "problem in creating user" });
    }

    const token = generateToken(user._id, res);

    res.status(201).json({
      userCreated: user,
    });
  } catch (error) {
    console.log("Register failed: " + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log("Login failed: " + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("JWT", { httpOnly: true, sameSite: "none", secure: true });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Logout failed: " + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const profileUpdate = async (req, res) => {
  try {
    const avatar = req.file.destination + "/" + req.file.filename;

    if (!avatar) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const image = await uploadImage(avatar);

    if (!image) {
      return res.status(500).json({ message: "Image upload failed" });
    }

    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { avatar: image },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.log("Profile update failed: " + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const authUser = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Auth user failed: " + error);
    res.status(500).json({ message: "Internal server error" });
  }
};
