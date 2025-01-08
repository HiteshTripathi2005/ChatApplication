import React from "react";
import { Link, NavLink } from "react-router-dom";
import { CircleUserRound, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-white p-3 shadow-md flex justify-between items-center">
      <div className="flex items-center ml-5 max-sm:ml-0">
        <NavLink className={"flex items-center"} to={"/"}>
          <img
            src="https://pngimg.com/d/symbol_infinity_PNG35.png"
            alt="logo"
            className="h-18 w-20 cursor-pointer max-sm:h-16 max-sm:w-18"
          />
        </NavLink>
      </div>

      <div className={"flex items-center" + (authUser ? "" : " hidden")}>
        <ul className="flex gap-16 max-sm:gap-10 list-none text-2xl cursor-pointer">
          <li className="flex items-center">
            <Link
              to={"/profile"}
              className="text-black no-underline transition-all duration-700  hover:text-blue-500 flex items-center gap-[3px] font-mono"
            >
              <CircleUserRound />
              <span className="max-sm:hidden">Profile</span>
            </Link>
          </li>
          <li>
            <Link
              className="text-black no-underline transition-all duration-700  hover:text-blue-500 flex items-center gap-[3px] font-mono"
              onClick={logout}
            >
              <LogOut />
              <span className="max-sm:hidden">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
