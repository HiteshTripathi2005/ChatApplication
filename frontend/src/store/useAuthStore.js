import { create } from "zustand";
import { axiosInstance } from "./../utils/axios";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";
import { useChatStore } from "./useChatStore";

const BASE_URL = import.meta.env.VITE_WS_URL;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  profileLoading: false,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/user/authuser");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      // console.error("Error checking auth", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    try {
      const res = await axiosInstance.post("/user/register", data);
      set({ authUser: res.data });
      toast.success("Signed up successfully");
      get().connectSocket();
    } catch (error) {
      console.error("Error signing up", error);
      toast.error(error?.response?.data?.message || "Error signing up");
    }
  },

  login: async (data) => {
    try {
      const res = await axiosInstance.post("/user/login", data);
      // After login, fetch user details immediately
      const userRes = await axiosInstance.get("/user/authuser");
      set({ authUser: userRes.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error logging in");
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/user/logout");
      set({ authUser: null });
      useChatStore.getState().setSelectedUser(null);
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      console.error("Error logging out", error);
    }
  },

  uploadImage: async (data) => {
    try {
      const res = await axiosInstance.post("/user/profile", data);
      set({ authUser: res.data.user });
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image", error);
      toast.error(error?.response?.data?.message || "Error uploading image");
    }
  },

  connectSocket: () => {
    const socket = io(BASE_URL, {
      query: {
        userId: get().authUser?._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    get().socket?.connected && get().socket.disconnect();
  },
}));
