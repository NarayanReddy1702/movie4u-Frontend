import { createBrowserRouter } from "react-router-dom";
import Error from "../Componates/Error/Error";
import CommonPage from "../Componates/CommonPage/CommonPage";
import Home from "../Componates/Home/Home";
import Bollywood from "../Componates/Bollywood/Bollywood";
import WebSeries from "../Componates/WebSeries/WebSeries"
import DualAudio from "../Componates/DualAudio/DualAudio";
import TVShow from "../Componates/TVShow/TVShow"
import ViewMore from "../Componates/ViewMore/ViewMore";
import Admin from "../Componates/Admin/Admin";
import CommonPage2 from "../Componates/Admin/CommonPage2/CommonPage2";
import AddAdmin from "../Componates/Admin/AddAdmin/AddAdmin";
import UpdateAdmin from "../Componates/Admin/UpdateAdmin/UpdateAdmin";
import SignUp from "../UI/SignUp/SignUp";
import Login from "../UI/Login/Login";
import UserTable from "../UI/UserTable/UserTable";
import ProtectRouter from "../Componates/ProtectRouter/ProtectRouter";
import Profile from "../Componates/Profile";
import UpdateUser from "../Componates/UpdateUser";


const router = createBrowserRouter([
 {
    path: "/",
    element: <CommonPage />,
    errorElement: <Error />,
    children: [
      // ✅ Public pages (no protection)
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },

      // ✅ Protected pages (user)
      {
        path: "",
        element: <ProtectRouter requiredRole="user"><Home /></ProtectRouter>,
      },
      {
        path: "movies/:movieID",
        element: <ProtectRouter requiredRole="user"><ViewMore /></ProtectRouter>,
      },
      {
        path: "updateUser/:id",
        element: <ProtectRouter requiredRole="user"><UpdateUser /></ProtectRouter>,
      },
      {
        path: "Bollywood",
        element: <ProtectRouter requiredRole="user"><Bollywood /></ProtectRouter>,
      },
      {
        path: "WebSeries",
        element: <ProtectRouter requiredRole="user"><WebSeries /></ProtectRouter>,
      },
      {
        path: "DualAudio",
        element: <ProtectRouter requiredRole="user"><DualAudio /></ProtectRouter>,
      },
      {
        path: "TVShow",
        element: <ProtectRouter requiredRole="user"><TVShow /></ProtectRouter>,
      },
      {
        path: "profile",
        element: <ProtectRouter requiredRole="user"><Profile /></ProtectRouter>,
      },
      

      
    ],
  },
  {
    path: '/admin', // ✅ use a separate root for admin
    element: <ProtectRouter requiredRole="admin"><CommonPage2 /></ProtectRouter>,
    children: [
      {
        path: "/admin",
        element: <Admin />
      },
      {
        path: "/admin/add",
        element: <AddAdmin />
      },
      {
        path: "/admin/update/:movieID",
        element: <UpdateAdmin />
      },{
        path: "/admin/userTable",
        element: <UserTable />
      },
    ]
  }
])


export default router 