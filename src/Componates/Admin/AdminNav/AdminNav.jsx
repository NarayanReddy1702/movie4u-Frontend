import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../../config';
import toast from 'react-hot-toast';
import axios from 'axios';

function AdminNav() {
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()
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
    <>
    <div className="Navigation w-full h-auto min-h-[12vh] flex items-center justify-center bg-zinc-950">
      <div className="nav-container flex flex-col md:flex-row w-full h-full px-4 md:px-14  py-4">
        <div className="logo flex items-center justify-center md:justify-start w-full md:w-[50%] h-full">
          <h1 className='text-2xl md:text-[3.5vh] font-sans text-white font-semibold'>Admin Movie4u</h1>
        </div>
        <div className="menu flex items-center justify-center md:justify-end w-full md:w-[50%] h-full mt-4 md:mt-0">
          <div className="nav flex flex-col sm:flex-row justify-around items-center gap-4 sm:gap-0">
            <NavLink to="/admin" className="font-semibold text-base text-white px-5 py-2 hover:text-gray-300">Show Admin</NavLink>
            <NavLink to="/admin/add" className="font-semibold text-base text-white px-5 py-2 hover:text-gray-300">Add admin</NavLink>
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
             <button onClick={handleLogout} className="rounded-sm px-4 h-10 bg-red-500 text-white font-semibold">logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AdminNav