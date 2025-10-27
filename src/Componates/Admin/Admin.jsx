import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import axios from "axios";
import toast from "react-hot-toast";

function Admin() {
  const [adminList, setAdminList] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [moviename, setMoviename] = useState("");
  const navigate = useNavigate();

  const HandleUpdate = (id) => {
    navigate(`/admin/update/${id}`);
    window.localStorage.setItem("MovieId", JSON.stringify(id));
  };

  // Fetch movie list
  useEffect(() => {
  axios
  .get(`${BASE_URL}api/movie/`, { withCredentials: true })
  .then((res) => {
    setAdminList(res.data.allMovies)
  })
  .catch((error) => console.log(error));

  }, []);

  // Filter movies when search changes
  useEffect(() => {
    if (moviename.trim() === "") {
      setDisplayData(adminList);
    } else {
      const filtered = adminList.filter((val) =>
        val.title?.toLowerCase().includes(moviename.toLowerCase())
      );
      setDisplayData(filtered);
    }
  }, [moviename, adminList]);

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete this movie ID: ${id}?`)) {
      axios
        .delete(`${BASE_URL}api/movie/deleteMovie/${id}`, { withCredentials: true })
        .then((res) => {
          const updatedList = adminList.filter((movie) => movie._id !== id);
          setAdminList(updatedList);
          setDisplayData(updatedList);
          toast.success(res.data?.message)
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {/* Search Section */}
      <div className="search-sec w-full h-[8vh] bg-zinc-950 flex items-center justify-center border-b-2 border-cyan-400 ">
        <input
          className="w-[88%] h-[85%] border-none outline-none text-white bg-zinc-950 placeholder:text-white placeholder:opacity-[0.6] px-5 focus:placeholder:opacity-0 focus:border focus:border-cyan-500"
          type="text"
          placeholder="Search Movies, Bollywood, Web Series"
          value={moviename}
          onChange={(event) => setMoviename(event.target.value)}
        />
      </div>

      {/* Data Table */}
      {Array.isArray(displayData) && displayData.length > 0 ? (
        <div className="admin-sec w-full">
          <div className="container mx-auto p-4 md:p-6">
            <div className="overflow-x-auto shadow-md rounded-lg">
              <table className="min-w-full w-max md:w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 md:px-6 py-2 md:py-3 border text-center border-gray-300 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      SI NO
                    </th>
                    <th className="px-4 md:px-6 py-2 md:py-3 border text-center border-gray-300 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Movie Name
                    </th>
                    <th className="px-4 md:px-6 py-2 md:py-3 border text-center border-gray-300 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Category
                    </th>
                    <th className="px-4 md:px-6 py-2 md:py-3 border text-center border-gray-300 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Release Date
                    </th>
                    <th className="px-4 md:px-6 py-2 md:py-3 border text-center border-gray-300 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Director
                    </th>
                    <th className="px-4 md:px-6 py-2 md:py-3 border text-center border-gray-300 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Edit
                    </th>
                    <th className="px-4 md:px-6 py-2 md:py-3 border text-center border-gray-300 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {displayData.map((value, index) => (
                    <tr className="hover:bg-gray-50" key={value._id}>
                      <td className="px-4 md:px-6 py-2 md:py-4 border text-center border-gray-300 text-sm">
                        {index + 1}
                      </td>
                      <td className="px-4 md:px-6 py-2 md:py-4 border text-center border-gray-300 uppercase text-sm">
                        {value.title}
                      </td>
                      <td className="px-4 md:px-6 py-2 md:py-4 border text-center border-gray-300 text-sm">
                        {value.category}
                      </td>
                      <td className="px-4 md:px-6 py-2 md:py-4 border text-center border-gray-300 text-sm whitespace-nowrap">
                        {value.releasedate}, {value.year}
                      </td>
                      <td className="px-4 md:px-6 py-2 md:py-4 border text-center border-gray-300 text-sm">
                        {value.director}
                      </td>
                      <td className="px-4 md:px-6 py-2 md:py-4 border text-center border-gray-300">
                        <button
                          className="border-2 bg-green-600 cursor-pointer text-white px-2 md:px-3 py-1 text-sm rounded-md hover:text-green-600 hover:bg-transparent hover:border-green-600"
                          onClick={() => HandleUpdate(value._id)}
                        >
                          Edit
                        </button>
                      </td>
                      <td className="px-4 md:px-6 py-2 md:py-4 border text-center border-gray-300">
                        <button
                          className="border-2 bg-red-600 cursor-pointer text-white px-2 md:px-3 py-1 text-sm rounded-md hover:text-red-600 hover:bg-transparent hover:border-red-600"
                          onClick={() => handleDelete(value._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center py-10 text-gray-600">There is no data yet...</p>
      )}
    </>
  );
}

export default Admin;
