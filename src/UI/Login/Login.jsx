import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../../config'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from "lucide-react"; // eye icons

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false) // 👈 toggle state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handelSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(`${BASE_URL}api/auth/login`, formData, { withCredentials: true })
      console.log(res.data);

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data?.user))
        localStorage.setItem("role", res.data?.user?.role)
        localStorage.setItem("token", res.data.token)
        toast.success(res.data.message)
        setFormData({ email: "", password: "" })
        navigate("/")
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong, please try again.");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl shadow-xl p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
          <p className="text-sm text-gray-400 mt-1">Sign in to continue to your account</p>
        </div>

        <form className="space-y-4" onSubmit={handelSubmit}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@domain.com"
              className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"} // 👈 toggle input type
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 pr-10 text-sm bg-gray-800 border border-gray-700 rounded-lg placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // 👈 toggle state
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="inline-flex items-center gap-2 text-gray-300">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-indigo-500 focus:ring-indigo-400" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-indigo-400 hover:text-indigo-300">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <input
            className='w-full cursor-pointer mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition'
            type="submit"
            value={"Sign in"}
          />
        </form>

        {/* Social Login */}
        <div className="flex items-center gap-3 my-6">
          <hr className="flex-1 border-gray-700" />
          <span className="text-xs text-gray-400">or continue with</span>
          <hr className="flex-1 border-gray-700" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button type="button" className="flex items-center justify-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white hover:bg-gray-800/80">
            Google
          </button>
          <button type="button" className="flex items-center justify-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white hover:bg-gray-800/80">
            GitHub
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Don’t have an account? <a href="/signup" className="text-indigo-400 hover:text-indigo-300">Sign up</a>
        </p>
      </div>
    </div>
  )
}

export default Login
