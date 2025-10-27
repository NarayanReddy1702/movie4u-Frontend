import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../config';
import toast from 'react-hot-toast';
import axios from 'axios';

function AdminNav() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}api/auth/logout`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.clear();
        setTimeout(() => navigate("/login"), 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong, please try again.");
    }
  };

  // Helper function to check active link
  const isActive = (path) => location.pathname === path;

  return (
    <div className="Navigation w-full h-auto min-h-[12vh] flex items-center justify-center bg-zinc-950">
      <div className="nav-container flex flex-col md:flex-row w-full h-full px-4 md:px-14 py-4">
        <div className="logo flex items-center justify-center md:justify-start w-full md:w-[50%] h-full">
          <img src="./movieLogo.png"
            alt="Movie Logo"
            className="w-35 h-20 object-cover cursor-pointer" onClick={()=>navigate("/admin")} />
        </div>

        <div className="menu flex items-center justify-center md:justify-end w-full md:w-[50%] h-full mt-4 md:mt-0">
          <div className="nav flex flex-col sm:flex-row justify-around items-center gap-4 sm:gap-0">
            <NavLink
              to="/admin/userTable"
              className={`font-semibold text-base px-5 py-2 ${
                isActive("/admin/userTable") ? "text-blue-500" : "text-white hover:text-blue-600"
              }`}
            >
              Users list
            </NavLink>

            <NavLink
              to="/admin"
              className={`font-semibold text-base px-5 py-2 ${
                isActive("/admin") ? "text-blue-500" : "text-white hover:text-blue-600"
              }`}
            >
              Movies List
            </NavLink>

            <NavLink
              to="/admin/add"
              className={`font-semibold text-base px-5 py-2 ${
                isActive("/admin/add") ? "text-blue-500" : "text-white hover:text-gray-300"
              }`}
            >
              Add New Movie
            </NavLink>

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
                className="rounded-sm px-4 h-10 cursor-pointer bg-red-500 text-white font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNav;
