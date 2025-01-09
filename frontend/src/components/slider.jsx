import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SliderSkeleton from "./skeletons/SliderSkeleton";

const Slider = () => {
  const {
    users,
    fetchUsers,
    fetchingUsers,
    setSelectedUser,
    fetchMessages,
    selectedUser,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div
      className={`fixed left-0 top-[80px] h-[calc(100vh-80px)] w-72 max-sm:w-full bg-white shadow-lg flex flex-col ${
        selectedUser ? "max-sm:hidden" : ""
      }`}
    >
      <div className="flex items-center justify-center border-b bg-primary ">
        <h2 className="text-xl font-semibold text-gray-800">Chats</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {fetchingUsers ? (
          <SliderSkeleton />
        ) : (
          <div className="p-4">
            <div className="space-y-4">
              {users.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center  space-x-3 rounded-lg p-3 hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out transform hover:scale-105"
                  onClick={() => {
                    setSelectedUser(user);
                    fetchMessages(user._id);
                  }}
                >
                  <div className="relative">
                    <img
                      src={user.avatar || "https://via.placeholder.com/150"}
                      className="size-12 rounded-full bg-gray-300"
                      alt={`${user.email}'s avatar`}
                    />
                    <div
                      className={
                        onlineUsers.includes(user._id)
                          ? "absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
                          : "hidden"
                      }
                    ></div>
                  </div>
                  <h1 className="font-medium pl-2 font-mono text-2xl text-gray-700">
                    {user.userName}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;
