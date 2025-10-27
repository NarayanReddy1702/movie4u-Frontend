import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from "../../config";
import axios from 'axios';
function ViewMore() {
  const [movieId ,setMovieId]=useState([])
    const {movieID} = useParams()
    // console.log(movieID);
    
  const rawMovie = window.localStorage.getItem("Movie");
const movie = rawMovie ? JSON.parse(rawMovie) : null;
//  console.log(movie);
 
   
   useEffect(()=>{
   try{
    axios.get(`${BASE_URL}api/movie/movieView/${movie}`,{withCredentials:true}).then(data=>setMovieId(data.data.getAMovie)).catch(error=>console.log(error))
   }
   catch(error){
    console.log("Message",error);
   }
   },[movieId])

  var Newgenres=movieId?.genres
   
   
  // console.log(movieId);
  

  return (
   <>
        <div className="movie-det min-h-screen w-full bg-cover bg-center bg-no-repeat bg-[url('../Images/bg-img.avif')] flex flex-col md:flex-row items-center justify-center px-4 py-12 md:py-20">
  
  {/* Movie Poster */}
  <div className="w-full md:w-1/2 flex items-center justify-center mb-10 md:mb-0">
    <img
      src={movieId.image}
      alt={movieId.title}
      className="w-[90%] sm:w-[75%] md:w-[70%] lg:w-[60%] rounded-lg border border-gray-700 shadow-2xl object-cover transform hover:scale-[1.03] transition-transform duration-300 ease-in-out"
    />
  </div>

  {/* Movie Details */}
  <div className="w-full md:w-1/2 flex flex-col items-start justify-center gap-4 text-white px-4 md:px-10 lg:px-16">
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-500 underline underline-offset-8">
      -:({movieId.title}):-
    </h1>

    <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
      <span className="text-sky-400 font-semibold text-lg md:text-xl">Genres: </span>
      {Newgenres}
    </p>

    <p className="text-sm sm:text-base md:text-lg lg:text-xl">
      <span className="text-sky-400 font-semibold text-lg md:text-xl">Year: </span>
      {movieId.year}
    </p>

    <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
      <span className="text-sky-400 font-semibold text-lg md:text-xl">Description: </span>
      {movieId.description}
    </p>

    <p className="text-sm sm:text-base md:text-lg lg:text-xl">
      <span className="text-sky-400 font-semibold text-lg md:text-xl">Directed by: </span>
      {movieId.director}
    </p>

    <p className="text-sm sm:text-base md:text-lg lg:text-xl">
      <span className="text-sky-400 font-semibold text-lg md:text-xl">Release Date: </span>
      {movieId.releasedate}, {movieId.year}
    </p>

    {/* Action Buttons (Optional) */}
    <div className="flex flex-wrap gap-4 mt-4">
      <button className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
        Watch Now
      </button>
      <button className="border cursor-pointer border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
        Download
      </button>
    </div>
  </div>
</div>

   </>
  )
}

export default ViewMore
