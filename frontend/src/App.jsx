import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import ChatPage from "./pages/ChatPage";
import ProfileUpdate from "./pages/ProfileUpdate";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");

  if (isFirefox) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Please use a different browser</h1>
      </div>
    );
  }

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/signin"
            element={!authUser ? <SignIn /> : <Navigate to={"/chat"} />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUp /> : <Navigate to={"/chat"} />}
          />
          <Route
            path="/chat"
            element={authUser ? <ChatPage /> : <Navigate to={"/signin"} />}
          />
          <Route
            path="/profile"
            element={authUser ? <ProfileUpdate /> : <Navigate to={"/signin"} />}
          />
          <Route path="*" element={<Navigate to={"/signin"} />} />
        </Routes>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
    </Router>
  );
};

export default App;
