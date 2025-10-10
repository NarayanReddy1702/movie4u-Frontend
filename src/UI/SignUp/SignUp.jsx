import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react"; // 👈 for toggle icons

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
      <div className="sign-in-part flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-800 p-4">
        <div className="sign-in-part-child flex flex-col items-center bg-gray-950 p-6 rounded-xl shadow-xl max-w-sm w-full border border-gray-800">
          <h1 className="text-white text-2xl font-bold mb-4">Sign up</h1>

          <form className="flex flex-col w-full" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="input-sec mb-3">
              <label className="text-gray-300 mb-1 block text-sm">Name</label>
              <input
                type="text"
                placeholder="Enter Your Name"
                className="w-full p-2 border border-purple-500 rounded-md bg-gray-800 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              />
            </div>

            {/* Email */}
            <div className="input-sec mb-3">
              <label className="text-gray-300 mb-1 block text-sm">Email</label>
              <input
                type="email"
                placeholder="Enter Your Email address"
                className="w-full p-2 border border-purple-500 rounded-md bg-gray-800 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>

            {/* Password with Eye Toggle */}
            <div className="input-sec mb-3">
              <label className="text-gray-300 mb-1 block text-sm">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // 👈 toggle type
                  placeholder="Enter Your Password"
                  className="w-full p-2 pr-10 border border-purple-500 rounded-md bg-gray-800 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div className="input-sec mb-4">
              <label className="text-gray-300 mb-1 block text-sm">Role</label>
              <select
                className="w-full p-2 border border-purple-500 rounded-md bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                onChange={(e) => setRole(e.target.value)}
                value={role}
                required
              >
                <option value="">Select Role</option>
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>

            {/* Gender Selection */}
            <div className="input-sec mb-4">
              <label className="text-gray-300 mb-1 block text-sm">Gender</label>
              <select
                className="w-full p-2 border border-purple-500 rounded-md bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </div>

            {/* Submit */}
            <button className="sign-in-btn w-full p-2 bg-purple-600 text-white font-semibold text-sm rounded-md hover:bg-purple-700 transition duration-300">
              Continue
            </button>
          </form>

          {/* Divider */}
          <div className="or-with-line flex items-center w-full my-4">
            <hr className="flex-grow border-gray-700" />
            <h5 className="text-gray-400 mx-2 text-xs">Or</h5>
            <hr className="flex-grow border-gray-700" />
          </div>

          {/* Social Login */}
          <div className="connect-account flex flex-col items-center w-full gap-3">
            <div className="connect-google-acc flex justify-center items-center gap-2 p-2 bg-gray-800 rounded-md w-full cursor-pointer hover:bg-gray-700 transition">
              <img src="./Images/google.svg" alt="" className="w-5 h-5" />
              <h5 className="text-white text-sm">Continue With Google</h5>
            </div>

            <div className="connect-google-acc flex items-center justify-center gap-2 p-2 bg-gray-800 rounded-md w-full cursor-pointer hover:bg-gray-700 transition">
              <img
                src="./Images/create-new-account.svg"
                alt=""
                className="w-5 h-5"
              />
              <h5 className="text-white text-sm">
                <NavLink to="/login">Account already Exist</NavLink>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
