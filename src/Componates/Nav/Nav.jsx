import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const location = useLocation();

  if (user) {
    console.log("Logged in user:", user);
  } else {
    console.log("No user logged in");
  }
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}api/auth/logout`,
        {},
        { withCredentials: true }
      );
      console.log(res.data);

      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.clear();
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(res.data.message); // only show error if success=false
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong, please try again.");
      }
    }
  };

  return (
    <nav className="w-full bg-zinc-950 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 md:py-3">
        {/* Logo */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
            MOVIES 4U
          </h1>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center space-x-8">
          <NavLink
            to="/"
            className={`${
              location.pathname === "/"
                ? "text-blue-400"
                : "text-white font-medium"
            } hover:text-blue-400 transition`}
          >
            Home
          </NavLink>
          <NavLink
            to="/Bollywood"
            className={`${
              location.pathname === "/Bollywood"
                ? "text-blue-400"
                : "text-white font-medium"
            } hover:text-blue-400 transition`}
          >
            Bollywood
          </NavLink>
          <NavLink
            to="/WebSeries"
            className={`${
              location.pathname === "/WebSeries"
                ? "text-blue-400"
                : "text-white font-medium"
            } hover:text-blue-400 transition`}
          >
            Web Series
          </NavLink>
          <NavLink
            to="/DualAudio"
            className={`${
              location.pathname === "/DualAudio"
                ? "text-blue-400"
                : "text-white font-medium"
            } hover:text-blue-400 transition`}
          >
            Dual Audio
          </NavLink>
          <NavLink
            to="/TVShow"
            className={`${
              location.pathname === "/TVShow"
                ? "text-blue-400"
                : "text-white font-medium"
            } hover:text-blue-400 transition`}
          >
            TV Show
          </NavLink>
        </div>

        {/* Profile / Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex gap-x-10 items-center">
              <div
                onClick={() => navigate("/profile")}
                className="w-12 h-12 cursor-pointer rounded-full bg-red-500 overflow-hidden border-2 border-white"
              >
                <img
                  className="w-full h-full object-cover"
                  src={user.profilePic}
                  alt="profile"
                />
              </div>
              <button
                onClick={handleLogout}
                className="rounded-sm px-4 h-10 bg-red-500 text-white font-semibold"
              >
                logout
              </button>
              {user.role==="admin"&& <button onClick={()=>navigate("/admin")} className="rounded-sm px-4 h-10 bg-blue-500 text-white font-semibold">
                 Admin
                </button>}
            </div>
          ) : (
            <>
              <Link
                to="/SignUp"
                className="border border-blue-600 bg-blue-500 px-4 py-2 rounded text-white text-sm font-medium hover:bg-transparent hover:text-blue-400 transition"
              >
                Signup
              </Link>
              <Link
                to="/Login"
                className="border border-blue-600 bg-blue-500 px-4 py-2 rounded text-white text-sm font-medium hover:bg-transparent hover:text-blue-400 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 py-4 bg-zinc-900">
          <NavLink
            to="/"
            className={`${
              location.pathname === "/"
                ? "text-blue-400"
                : "text-white font-medium"
            } hover:text-blue-400 transition`}
          >
            Home
          </NavLink>
          <NavLink
            to="/Bollywood"
            className={`${
              location.pathname === "/Bollywood"
                ? "text-blue-400"
                : "text-white font-medium"
            } hover:text-blue-400 transition`}
          >
            Bollywood
          </NavLink>
          <NavLink
            to="/WebSeries"
            className={`${
              location.pathname === "/WebSeries"
                ? "text-blue-400"
                : "text-white font-medium"
            } hover:text-blue-400 transition`}
          >
            Web Series
          </NavLink>
          <NavLink
            to="/DualAudio"
            className={`${
              location.pathname === "/DualAudio"
                ? "text-blue-400"
                : "text-white font-medium"
            } hover:text-blue-400 transition`}
          >
            Dual Audio
          </NavLink>
          <NavLink
            to="/TVShow"
            className={`${
              location.pathname === "/TVShow"
                ? "text-blue-400"
                : "text-white font-medium"
            } hover:text-blue-400 transition`}
          >
            TV Show
          </NavLink>

          {/* Auth/Profile in mobile menu */}
          {user ? (
            <div className="w-full items-center justify-center flex gap-x-5">
              <div
                onClick={() => navigate("/profile")}
                className="w-16 h-16 mt-2 cursor-pointer rounded-full bg-red-500  border-2 border-white"
              >
                <img
                  className="w-full h-full object-cover"
                  src={user.profilePic}
                  alt="profile"
                />
              </div>
              <button
                onClick={handleLogout}
                className="rounded-sm px-4 py-1 bg-red-500 text-white font-semibold"
              >
                logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-4 mt-2">
              <Link
                to="/SignUp"
                className="border border-blue-600 bg-blue-500 px-4 py-2 rounded text-white text-sm font-medium hover:bg-transparent hover:text-blue-400 transition"
              >
                Signup
              </Link>
              <Link
                to="/Login"
                className="border border-blue-600 bg-blue-500 px-4 py-2 rounded text-white text-sm font-medium hover:bg-transparent hover:text-blue-400 transition"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Nav;
