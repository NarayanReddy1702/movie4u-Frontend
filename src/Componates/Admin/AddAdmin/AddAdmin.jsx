import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { BASE_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AddAdmin() {
  const [movieDet, setMovieDet] = useState({
    title: "",
    image: "",
    category: "",
    releasedate: "",
    year: "",
    director: "",
    description: "",
    genres: [],
  });

const navigate = useNavigate()

  const [arr, setArr] = useState([0]); // Start with one genre input
  // Use this to redirect after form submission

  const addInputBox = () => {
    setArr((prev) => [...prev, prev.length]);
    setMovieDet((prev) => ({
      ...prev,
      genres: [...prev.genres, ""],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieDet((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenreChange = (e, index) => {
    const newGenres = [...movieDet.genres];
    console.log(newGenres);

    newGenres[index] = e.target.value;
    console.log(index);
    console.log(newGenres[index]);
    console.log(newGenres);

    setMovieDet({
      ...movieDet,
      genres: newGenres,
    });
  };

 const handleFormSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append("title", movieDet.title);
  formData.append("image", movieDet.image); // File object
  formData.append("category", movieDet.category);
  formData.append("releasedate", movieDet.releasedate);
  formData.append("year", movieDet.year);
  formData.append("director", movieDet.director);
  formData.append("description", movieDet.description);

  // Append genres array
  movieDet.genres.forEach((genre, index) => {
    formData.append(`genres[${index}]`, genre);
  });

  try {
    const res = await axios.post(`${BASE_URL}api/movie/addMovie`, formData, {
      withCredentials: true, 
    });
 
  
    
 
    if (res.data?.success) {
      toast.success(res.data.message);

      // Reset form
      setMovieDet({
        title: "",
        image: "",
        category: "",
        releasedate: "",
        year: "",
        director: "",
        description: "",
        genres: [],
      });
      setArr([0]);
      setTimeout(()=>{
        navigate("/admin")
      },2000)
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to upload movie");
  }
};


  return (
    <div className="container mx-auto p-6 h-min-[100vh]">
      <form
        className="max-w-3xl mx-auto mt-16 shadow border-[1px] border-black bg-white rounded-lg p-6"
        onSubmit={handleFormSubmit}
      >
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          Update Movie Detail
        </h2>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Movie Name *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Enter movie name"
            value={movieDet.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="href"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Upload Image *
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={(e) =>
              setMovieDet((prev) => ({
                ...prev,
                image: e.target.files[0], // store File object instead of URL string
              }))
            }
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Category *
          </label>
          <select
            id="category"
            name="category"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={movieDet.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="Bollywood">Bollywood</option>
            <option value="Hindi">Hindi</option>
            <option value="Web Series">Web Series</option>
            <option value="Hollywood">Hollywood</option>
            <option value="English">English</option>
            <option value="Telugu">Telugu</option>
            <option value="Punjabi">Punjabi</option>
            <option value="Tamil">Tamil</option>
            <option value="TV Show">TV Show</option>
            <option value="Dual Audio">Dual Audio</option>
            
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="releasedate"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Release Date *
          </label>
          <input
            type="date"
            id="releasedate"
            name="releasedate"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Release Date"
            value={movieDet.releasedate}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="year"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Year
          </label>
          <input
            type="number"
            id="year"
            name="year"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Release year"
            value={movieDet.year}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="director"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Directed by
          </label>
          <input
            type="text"
            id="director"
            name="director"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Directed By"
            value={movieDet.director}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter movie description"
            value={movieDet.description}
            onChange={handleChange}
          />
        </div>

        <div className="flex w-full flex-wrap gap-x-4 items-center justify-center">
          {arr.map((val, index) => (
            <div className="mb-6 flex-col" key={index}>
              <label
                htmlFor={`genre-${index}`}
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Genre {index + 1}
              </label>
              <div className="flex gap-x-2 items-center">
                <select
                  id={`genre-${index}`}
                  name={`genre-${index}`}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={movieDet.genres[index] || ""}
                  onChange={(e) => handleGenreChange(e, index)}
                >
                  <option value="">Select Genre</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Drama">Drama</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Romance">Romance</option>
                  <option value="Crime">Crime</option>
                  <option value="Action">Action</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Horror">Horror</option>
                </select>
              </div>
            </div>
          ))}

          <div
            className="text-[3vh] cursor-pointer"
            title="If you want to add more genres section"
          >
            <IoAddCircleOutline onClick={addInputBox} />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-blue-500 cursor-pointer w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAdmin;
