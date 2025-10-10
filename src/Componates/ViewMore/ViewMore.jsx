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
        <div className="movie-det min-h-screen w-full bg-cover bg-[url('../Images/bg-img.avif')] bg-center flex flex-col items-center justify-center md:flex-row">
          <div className="h-[100vh] w-full flex items-center  justify-center px-8 md:w-[60%] ">
            <img className='w-[90%] h-[70%]  md:w-[60%] md:h-[86%] object-cover bg-gradient-to-r from-red-500 to-violet-400 p-2 rounded-md hover:scale-[1.025] transition-all ease-in-out duration-200' 
              src={movieId.image}
              alt={movieId.title}
            />
          </div>
          <div className="h-full w-full md:w-[50%] pl-10  flex flex-col items-start justify-center  gap-y-4 mb-32  md:pt-40">
            <h1 className='text-3xl  md:text-4xl text-red-600 underline underline-offset-8'>-:({movieId.title}):-</h1>
            <p className='text-white text-[16px]  md:text-[20px] pt-5'><span className='text-sky-600 text-xl md:text-2xl'>Genres:-</span>{Newgenres}</p>
            <p className='text-white text-[16px] md:text-[20px]'><span className='text-sky-600 text-xl md:text-2xl'>Year:-</span> {movieId.year}</p>
            <p className='text-white text-[16px] md:text-[20px]'><span className='text-sky-600 text-xl md:text-2xl'>Description:-</span> {movieId.description}</p>
            <p className='text-white text-[16px] md:text-[20px]'><span className='text-sky-600 text-xl md:text-2xl'>Directed by:-</span> {movieId.director}</p>
            <p className='text-white text-[16px] md:text-[20px]'><span className='text-sky-600 text-xl md:text-2xl'>Release date:-</span> {movieId.releasedate}, {movieId.year}</p>
          </div>
        </div>
   </>
  )
}

export default ViewMore
