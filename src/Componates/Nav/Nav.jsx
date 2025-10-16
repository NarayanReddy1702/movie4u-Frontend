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
      <nav className="w-full bg-zinc-950 shadow-md fixed top-0 left-0 z-50">
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
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            {["/", "/Bollywood", "/WebSeries", "/DualAudio", "/TVShow"].map((path, index) => (
              <NavLink
                key={index}
                to={path}
                className={`${
                  location.pathname === path ? "text-blue-400" : "text-white font-medium"
                } hover:text-blue-400 transition`}
              >
                {path === "/" ? "Home" : path.replace("/", "")}
              </NavLink>
            ))}
          </div>

          {/* Profile / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex gap-x-10 items-center">
                <div
                  onClick={() => navigate("/profile")}
                  className="w-12 h-12 cursor-pointer rounded-full bg-red-500 overflow-hidden border-2 border-white"
                >
                  <img className="w-full h-full object-cover" src={user.profilePic} alt="profile" />
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-sm px-4 h-10 bg-red-500 cursor-pointer text-white font-semibold"
                >
                  Logout
                </button>
                {user.role === "admin" && (
                  <button
                    onClick={() => navigate("/admin")}
                    className="rounded-sm px-4 h-10 cursor-pointer bg-blue-500 text-white font-semibold"
                  >
                    Admin
                  </button>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/SignUp"
                  className="border border-blue-600 cursor-pointer bg-blue-500 px-4 py-2 rounded text-white text-sm font-medium hover:bg-transparent hover:text-blue-400 transition"
                >
                  Signup
                </Link>
                <Link
                  to="/Login"
                  className="border cursor-pointer border-blue-600 bg-blue-500 px-4 py-2 rounded text-white text-sm font-medium hover:bg-transparent hover:text-blue-400 transition"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

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
