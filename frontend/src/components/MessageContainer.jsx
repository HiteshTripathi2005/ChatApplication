import React, { useEffect, useRef } from "react"; // Add useRef import
import { useChatStore } from "../store/useChatStore";
import SelectUser from "./SelectUser";
import { useAuthStore } from "./../store/useAuthStore";
import MessageInput from "./MessageInput";
import formatTime from "../utils/formatTime";
import { ArrowLeft } from "lucide-react";
import MessageSkeleton from "./MessageSkeleton";

const MessageContainer = () => {
  const {
    selectedUser,
    messages,
    subscribeToMessages,
    setSelectedUser,
    fetchingMessages,
  } = useChatStore();
  const { authUser, onlineUsers } = useAuthStore();

  // Add ref for messages container
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    subscribeToMessages();
  }, [subscribeToMessages]);

  if (!selectedUser) {
    return <SelectUser />;
  }

  return (
    <div className="fixed inset-0 pt-14 ml-72 max-sm:ml-0">
      {/* Header */}
      <div className="absolute top-20 left-1 right-1 bg-primary border-b h-[61px] shadow-md z-40">
        <div className="flex items-center h-full px-4 relative">
          <div className="flex items-center gap-3 w-full">
            <button
              onClick={() => setSelectedUser(null)}
              className="hidden max-sm:flex items-center justify-center p-1.5 hover:bg-gray-100 rounded-full absolute left-2"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-3 max-sm:ml-12">
              <div className="relative">
                <img
                  src={selectedUser?.avatar}
                  alt="User avatar"
                  className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
                />
                {onlineUsers.includes(selectedUser?._id) && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <h3 className="font-semibold text-lg text-gray-700 truncate">
                {selectedUser?.userName}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="absolute top-[61px] bottom-[60px] left-0 right-0 overflow-y-auto p-4 max-sm:p-2">
        {fetchingMessages ? (
          <MessageSkeleton />
        ) : messages?.length > 0 ? (
          messages.map((message) => (
            <div
              key={`${message._id}`}
              className={`w-fit p-3 mb-2 break-words max-w-[80%] max-sm:max-w-[85%] ${
                message.senderId === authUser._id
                  ? "ml-auto bg-primary text-white rounded-tl-lg rounded-bl-lg rounded-tr-sm"
                  : "mr-auto bg-gray-200 text-gray-800 rounded-tr-lg rounded-br-lg rounded-tl-sm"
              }`}
            >
              <div className="text-sm max-sm:text-[0.9rem]">{message.text}</div>
              <div
                className={`text-[10px] mt-1 ${
                  message.senderId === authUser._id
                    ? "text-gray-200"
                    : "text-gray-500"
                }`}
              >
                {formatTime(message.createdAt)}
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-sm">No messages yet</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-white border-t p-3">
        <MessageInput />
      </div>
    </div>
  );
};

export default MessageContainer;
