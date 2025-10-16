import axios from "axios";
import { BASE_URL } from "../../config";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UserTable() {
  const navigate = useNavigate();
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    async function fetchAllUser() {
      try {
        let res = await axios.get(`${BASE_URL}api/auth/allUser`, {
          withCredentials: true,
        });
        if (res.data?.success) {
          setAllUser(res.data?.allUser);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchAllUser();
  }, [allUser]);

  async function handleDelete(id) {
    try {
      const confirmUser = confirm(`Do you wanna delete this id ${id} user`);
      if (confirmUser) {
        const res = await axios.delete(`${BASE_URL}api/auth/deleteUser/${id}`);
        const { success, message } = res?.data;
        if (success) {
          toast.success(message);
        }
      }
    } catch (error) {
      toast.error("Failed to delete user");
    }
  }

  return (
    <>
      <div className="container mx-auto p-4 md:p-6">
        {allUser.length > 0 ? (
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full w-max md:w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 md:px-6 py-2 md:py-3 border text-center border-gray-300 text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    SI NO
                  </th>
                  <th className="px-4 md:px-6 py-2 md:py-3 border text-center border-gray-300 text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    UserName
                  </th>
                  <th className="px-4 md:px-6 py-2 md:py-3 border text-center border-gray-300 text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Email
                  </th>
                  <th className="px-4 md:px-6 py-2 md:py-3 border text-center border-gray-300 text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Gender
                  </th>
                  <th className="px-4 md:px-6 py-2 md:py-3 border text-center border-gray-300 text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    User Role
                  </th>
                  <th className="px-4 md:px-6 py-2 md:py-3 border text-center border-gray-300 text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Edit
                  </th>
                  <th className="px-4 md:px-6 py-2 md:py-3 border text-center border-gray-300 text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <>
                  {allUser.map((items, index) => (
                    <tr key={items._id} className="hover:bg-gray-50">
                      <td className="px-4 md:px-6 py-2 md:py-4 border text-center border-gray-300 text-sm">
                        {index + 1}
                      </td>
                      <td className="px-4 md:px-6 py-2 md:py-4 border text-center border-gray-300 uppercase text-sm">
                        {items.username}
                      </td>
                      <td className="px-4 md:px-6 py-2 md:py-4 border text-center border-gray-300 text-sm">
                        {items.email}
                      </td>
                      <td className="px-4 md:px-6 py-2 md:py-4 border text-center border-gray-300 text-sm">
                        {items.gender}
                      </td>
                      <td className="px-4 md:px-6 py-2 md:py-4 border text-center border-gray-300 text-sm">
                      <span
  className={`
    font-semibold px-3 py-1 rounded-full text-sm
    ${items.role === "admin" ? "bg-blue-500/25 text-blue-700" : ""}
    ${items.role === "user" ? "bg-green-500/25 text-green-700" : ""}
  `}
>
  {items.role}
</span>
                      </td>
                      <td className="px-4 md:px-6 py-2 md:py-4 border text-center border-gray-300">
                        <button
                          className="border-2 bg-green-600 text-white px-2 md:px-3 py-1 text-sm rounded-md hover:text-green-600 hover:bg-transparent hover:border-green-600 cursor-pointer"
                          onClick={() =>
                            navigate(`/admin/editUser/${items._id}`)
                          }
                        >
                          Edit
                        </button>
                      </td>
                      <td className="px-4 md:px-6 py-2 md:py-4 border text-center border-gray-300">
                        <button
                          className="border-2 bg-red-600 text-white px-2 md:px-3 py-1 text-sm rounded-md hover:text-red-600 hover:bg-transparent hover:border-red-600 cursor-pointer"
                          onClick={() => handleDelete(items._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center py-5 text-gray-600">
            There is no data yet...
          </p>
        )}
      </div>
    </>
  );
}

export default UserTable;
