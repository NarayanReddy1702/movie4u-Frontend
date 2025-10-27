import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react"; // 👈 for toggle icons
import { FcGoogle } from "react-icons/fc";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}api/auth/register`,
        {
          username,
          email,
          password,
          role,
          gender,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setUsername("");
        setEmail("");
        setPassword("");
        setRole("");
        setGender("");
        navigate("/login");
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
     <div className="flex flex-col  items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
      {/* Card */}
      <div className="bg-gray-900/60  backdrop-blur-xl p-8    rounded-2xl shadow-2xl border border-gray-800 max-w-md w-full text-white">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          Create Your Account
        </h1>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-3 py-2 pr-10 rounded-lg bg-gray-800 border border-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-purple-400 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Role</label>
            <select
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              onChange={(e) => setRole(e.target.value)}
              value={role}
              required
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Gender</label>
            <select
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              onChange={(e) => setGender(e.target.value)}
              value={gender}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-3 bg-gradient-to-r cursor-pointer from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-2 rounded-lg font-semibold transition-transform hover:scale-[1.02] shadow-lg"
          >
            Continue
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <hr className="flex-grow border-gray-700" />
          <span className="text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-700" />
        </div>

        {/* Social login */}
        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 py-2 rounded-lg transition">
           <FcGoogle />
            <span className="text-sm">Continue with Google</span>
          </button>

          <div className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Sign in
            </NavLink>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default SignUp;
