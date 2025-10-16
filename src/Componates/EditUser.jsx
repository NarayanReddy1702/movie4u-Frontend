import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const EditUser = () => {
  const { id } = useParams();
  const [getOneUser, setGetOneUser] = useState({});
  const navigate = useNavigate()
  const userDet = JSON.parse(localStorage.getItem("user")) 

  const [formData, setFormData] = useState({
    username:"",
    email: "",
    gender:""
  });
  useEffect(() => {
    axios
      .get(`${BASE_URL}api/auth/getOneUser/${id}`,{withCredentials:true})
      .then((res) => res.data?.success && setGetOneUser(res.data?.user))
      .catch(error=>console.error("Failed to get one user"))
  }, []);

  useEffect(()=>{
     if(getOneUser){
        setFormData({
            username:getOneUser.username,
            email:getOneUser.email,
            gender:getOneUser.gender
        })
     }
  },[getOneUser])
  
  function handleChange(e) {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {   
       const res = await axios.put(`${BASE_URL}api/auth/updateUser/${id}`,formData,{withCredentials:true})
       const {success,message,user}=res.data
       if(success){
        toast.success(message)
        
        if(userDet?._id.toString() === id.toString()){
            localStorage.setItem("user",JSON.stringify(user))
        }
        console.log(res.data?.user);
        
        setFormData({
            username:"",
            email:"",
            gender:""
        })
        setTimeout(()=>{
          navigate("/admin/userTable")
        },1000)
       }
    } catch (error) {
        
    }
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Update User
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
  );
};

export default EditUser;
