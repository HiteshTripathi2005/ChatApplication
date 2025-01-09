import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useState } from "react";

const MessageInput = () => {
  const { selectedUser, sendMessage } = useChatStore();

  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    sendMessage(selectedUser._id, message);
    setMessage("");
  };

  return (
    <div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={message}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleSendMessage();
            }
          }}
        />
        <button
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
