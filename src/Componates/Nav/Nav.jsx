import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${BASE_URL}api/auth/logout`, {}, { withCredentials: true });

      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.clear();
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(res.data.message);
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
    <>
      {/* Navbar */}
      <nav className="w-full bg-zinc-950 shadow-md sticky top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 md:py-3">
          {/* Logo Section */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <img
              src="./movieLogo.png"
              alt="Movie Logo"
              className="w-35 h-20 object-cover cursor-pointer"
              onClick={() => navigate("/")}
            />

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex flex-1 justify-center space-x-10">
            {[
              { path: "/", label: "Home" },
              { path: "/Bollywood", label: "Bollywood" },
              { path: "/WebSeries", label: "Web Series" },
              { path: "/DualAudio", label: "Dual Audio" },
              { path: "/TVShow", label: "TV Shows" },
            ].map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={`relative text-sm font-medium transition duration-300 ${
                  location.pathname === path
                    ? "text-blue-400 after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-blue-400"
                    : "text-gray-300 hover:text-blue-400"
                }`}
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Profile / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-x-6">
                {/* Profile Picture */}
                <div
                  onClick={() => navigate("/profile")}
                  className="w-11 h-11 rounded-full overflow-hidden border-2 border-blue-500 cursor-pointer hover:scale-105 transition"
                >
                  <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 cursor-pointer bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold text-sm transition"
                >
                  Logout
                </button>

                {/* Admin Button */}
                {user.role === "admin" && (
                  <button
                    onClick={() => navigate("/admin")}
                    className="px-5 py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold text-sm transition"
                  >
                    Admin
                  </button>
                )}
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/SignUp"
                  className="px-5 py-2 bg-blue-600 border border-blue-600 text-white rounded-md font-semibold text-sm hover:bg-transparent hover:text-blue-400 transition"
                >
                  Sign Up
                </Link>
                <Link
                  to="/Login"
                  className="px-5 py-2 bg-blue-600 border border-blue-600 text-white rounded-md font-semibold text-sm hover:bg-transparent hover:text-blue-400 transition"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Remove middle dropdown for mobile — only right-side nav remains */}

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Right-Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 sm:w-1/3 bg-zinc-900 shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col items-center space-y-6 mt-20">
          {["/", "/Bollywood", "/WebSeries", "/DualAudio", "/TVShow"].map((path, index) => (
            <NavLink
              key={index}
              to={path}
              onClick={() => setIsMenuOpen(false)}
              className={`${
                location.pathname === path ? "text-blue-400" : "text-white font-medium"
              } hover:text-blue-400 transition`}
            >
              {path === "/" ? "Home" : path.replace("/", "")}
            </NavLink>
          ))}

          {/* Auth/Profile Section */}
          {user ? (
            <div className="flex flex-col items-center space-y-3 mt-6">
              <div
                onClick={() => {
                  navigate("/profile");
                  setIsMenuOpen(false);
                }}
                className="w-16 h-16 cursor-pointer rounded-full bg-red-500 overflow-hidden border-2 border-white"
              >
                <img className="w-full h-full object-cover" src={user.profilePic} alt="profile" />
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="rounded-sm cursor-pointer px-6 py-2 bg-red-500 text-white font-semibold"
              >
                Logout
              </button>
              {user.role === "admin" && (
                <button
                  onClick={() => {
                    navigate("/admin");
                    setIsMenuOpen(false);
                  }}
                  className="rounded-sm px-6 py-2 bg-blue-500 text-white font-semibold"
                >
                  Admin
                </button>
              )}
            </div>
          ) : (
            <div className="flex space-x-4 mt-4">
              <Link
                to="/SignUp"
                onClick={() => setIsMenuOpen(false)}
                className="border border-blue-600 bg-blue-500 px-4 py-2 rounded text-white text-sm font-medium hover:bg-transparent hover:text-blue-400 transition"
              >
                Signup
              </Link>
              <Link
                to="/Login"
                onClick={() => setIsMenuOpen(false)}
                className="border border-blue-600 bg-blue-500 px-4 py-2 rounded text-white text-sm font-medium hover:bg-transparent hover:text-blue-400 transition"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Nav;