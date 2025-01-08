import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import { useAuthStore } from "./useAuthStore";

const useChatStore = create((set, get) => ({
  users: [],
  selectedUser: null,
  messages: [],

  fetchUsers: async () => {
    try {
      const response = await axiosInstance.get("/message/friends");
      set({ users: response.data.data });
    } catch (error) {
      console.log("Error fetching users: ", error);
      toast.error("Error fetching users");
    }
  },

  fetchMessages: async (id) => {
    try {
      const res = await axiosInstance.get(`/message/${id}`);
      set({ messages: res.data.data || [] });
    } catch (error) {
      console.log("Error fetching messages: ", error);
      toast.error("Error fetching messages");
    }
  },

  sendMessage: async (id, text) => {
    try {
      const res = await axiosInstance.post("/message/send/" + id, { text });
      // set((state) => ({ messages: [...state.messages, res.data.newMessage] }));
      set({ messages: [...get().messages, res.data.newMessage] });
    } catch (error) {
      console.log("Error sending message: ", error);
    }
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unSubscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));

export { useChatStore };
