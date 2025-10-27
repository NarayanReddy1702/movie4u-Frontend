import React, { useEffect, useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../config';
import axios from 'axios';
import toast from 'react-hot-toast';

function UpdateAdmin() {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState(null);
  const [movieDet, setMovieDet] = useState({
    title: '',
    image: null,
    category: '',
    releasedate: '',
    year: '',
    director: '',
    description: '',
    genres: [],
    _id: '',
  });
  const [arr, setArr] = useState([0]); // start with one genre input

  const movieDetail = JSON.parse(window.localStorage.getItem("MovieId"));

  const addInputBox = () => {
    setArr(prev => [...prev, prev.length]);
    setMovieDet(prev => ({
      ...prev,
      genres: [...prev.genres, ''],
    }));
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}api/movie/movieView/${movieDetail}`, { withCredentials: true })
      .then(({ data }) => {
        const movie = data.getAMovie;
        setMovieData(movie);
        setMovieDet({
          title: movie.title || '',
          image: null,
          category: movie.category || '',
          releasedate: movie.releasedate || '',
          year: movie.year || '',
          director: movie.director || '',
          description: movie.description || '',
          genres: Array.isArray(movie.genres) ? movie.genres : [''],
          _id: movie._id,
        });

        if (Array.isArray(movie.genres)) {
          setArr(new Array(movie.genres.length || 1).fill(0));
        }
      })
      .catch(error => console.log(error));
  }, [movieDetail]);

  const updateData = async (id) => {
    if (!movieDet.title || !movieDet.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append('title', movieDet.title);
    formData.append('category', movieDet.category);
    formData.append('releasedate', movieDet.releasedate);
    formData.append('year', movieDet.year);
    formData.append('director', movieDet.director);
    formData.append('description', movieDet.description);
    movieDet.genres.forEach((genre, index) => {
      formData.append(`genres[${index}]`, genre);
    });
    if (movieDet.image) {
      formData.append('image', movieDet.image);
    }

    try {
      const res = await axios.put(
        `${BASE_URL}api/movie/updateMovie/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      toast.success("Movie updated successfully!");
     setTimeout(()=>{
          navigate("/Admin");
     },2000)
    } catch (error) {
     
      toast.error("Error updating movie. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6 h-min-[100vh]">
      <form className="max-w-3xl mx-auto mt-16 shadow border-[1px] border-black bg-white rounded-lg p-6">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          Update Movie Detail
        </h2>

        {/* Title */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Movie Name *</label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={movieDet.title}
            onChange={e => setMovieDet(prev => ({ ...prev, title: e.target.value }))}
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Upload Image *</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setMovieDet(prev => ({ ...prev, image: e.target.files[0] }))}
          />
        </div>

        {/* Category */}
        <div className="mb-6">
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category *</label>
          <select
            id="category"
            name="category"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={movieDet.category}
            onChange={e => setMovieDet(prev => ({ ...prev, category: e.target.value }))}
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

        {/* Release Date */}
        <div className="mb-6">
          <label htmlFor="releasedate" className="block text-gray-700 text-sm font-bold mb-2">Release Date</label>
          <input
            type="date"
            id="releasedate"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={movieDet.releasedate}
            onChange={e => setMovieDet(prev => ({ ...prev, releasedate: e.target.value }))}
          />
        </div>

        {/* Year */}
        <div className="mb-6">
          <label htmlFor="year" className="block text-gray-700 text-sm font-bold mb-2">Year</label>
          <input
            type="number"
            id="year"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={movieDet.year}
            onChange={e => setMovieDet(prev => ({ ...prev, year: e.target.value }))}
          />
        </div>

        {/* Director */}
        <div className="mb-6">
          <label htmlFor="director" className="block text-gray-700 text-sm font-bold mb-2">Director</label>
          <input
            type="text"
            id="director"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={movieDet.director}
            onChange={e => setMovieDet(prev => ({ ...prev, director: e.target.value }))}
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            id="description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={movieDet.description}
            onChange={e => setMovieDet(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>

        {/* Genres */}
        <div className="flex w-full flex-wrap gap-x-4 items-center justify-center">
          {arr.map((_, index) => (
            <div className="mb-6 flex-col" key={index}>
              <label className="block text-gray-700 text-sm font-bold mb-2">Genre {index + 1}</label>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={movieDet.genres[index] || ''}
                onChange={e => {
                  const newGenres = [...movieDet.genres];
                  newGenres[index] = e.target.value;
                  setMovieDet({ ...movieDet, genres: newGenres });
                }}
              >
                <option value="">Select a Genre</option>
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
          ))}
          <div className='text-[3vh] cursor-pointer' onClick={addInputBox} title="Add more genres">
            <IoAddCircleOutline />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={() => updateData(movieDet._id)}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateAdmin;
