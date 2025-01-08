import User from "./../models/user.model.js";
import Message from "./../models/message.model.js";
import uploadImage from "../utils/cloudinary.js";
import { getReceiverSocketId, io } from "../utils/socket.js";

export const getUserForSlider = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const users = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );

    return res
      .status(200)
      .json({ messages: "Users fetched successfully", data: users });
  } catch (error) {
    console.log("Error in getUserForSlider: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    if (messages.length === 0) {
      return res.status(200).json({ message: "No messages found", messages });
    }

    return res
      .status(200)
      .json({ message: "Messages fetched", data: messages });
  } catch (error) {
    console.log("Error in getMessage: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      imageUrl = uploadImage(image);
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(200).json({ message: "Message sent", newMessage });
  } catch (error) {
    console.log("Error in sendMessage: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
