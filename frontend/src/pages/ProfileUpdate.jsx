import React, { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { useAuthStore } from "./../store/useAuthStore";

const ProfileUpdate = () => {
  const { authUser, uploadImage } = useAuthStore();

  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;
    setAvatar(URL.createObjectURL(file));

    const formData = new FormData();

    formData.append("avatar", file);

    await uploadImage(formData);
  };

  return (
    <div className="min-h-screen flex  items-center justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 max-sm:p-3 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Update Profile
        </h2>

        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Avatar
            </label>
            <div className="w-32 h-32 mb-4 relative group">
              <img
                src={
                  avatar || authUser.avatar || "https://via.placeholder.com/150"
                }
                className="w-full h-full rounded-full object-cover border-4 border-indigo-100"
              />

              <label
                htmlFor="avatar"
                className="absolute bottom-0 right-0 hover:bg-black p-2 pb-1  rounded-full hover:text-white cursor-pointer bg-blue-400 text-white transition-colors duration-200"
              >
                <Camera />
              </label>
            </div>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={authUser?.fullName}
                disabled
                className="mt-1 block w-[93%] px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm sm:text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={authUser?.email}
                disabled
                className="mt-1 block w-[93%] px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm sm:text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Joined Date
              </label>
              <input
                type="text"
                value={new Date(authUser?.createdAt).toLocaleDateString()}
                disabled
                className="mt-1 block w-[93%] px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm sm:text-sm cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
