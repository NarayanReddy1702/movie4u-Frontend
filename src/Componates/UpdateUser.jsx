import axios from 'axios';
import React, { useState } from 'react'
import {BASE_URL} from "../config"
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {
    
    const {id}=useParams()
     const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: storedUser.username || "",
    email: storedUser.email || "",
    gender: storedUser.gender || "",
  });

  const handleChange =(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Submitting formData:", formData);

  try {
    const res = await axios.put(
      `${BASE_URL}api/auth/updateUser/${id}`,
      formData,
      { withCredentials: true }
    );

    console.log("Backend response:", res.data);

    if (res.data?.success && res.data?.user) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success(res.data.message);
      setTimeout(() => navigate("/profile"), 200);
    } else {
      toast.error(res.data?.message || "Failed to update user");
    }
  } catch (error) {
    console.error("Update error:", error);
    toast.error(error.response?.data?.message || "Something went wrong, please try again.");
  }
};



  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full p-2 rounded-md bg-gray-700 text-white text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-2 rounded-md bg-gray-700 text-white text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-700 text-white text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateUser
