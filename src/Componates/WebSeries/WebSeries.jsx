import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../config'

function WebSeries() {

  const [data,setData]=useState([])
useEffect(()=>{
  try{
     axios.get(`${BASE_URL}api/movie/`, {
          withCredentials: true,
        }).then((res)=>{
 setData(res.data.allMovies);
        }).catch((err)=>{
console.log(err);
        })
  }catch(error){
    console.log(error);
    
  }
},[])
  
  const navigate=useNavigate()
  const HandleBollywoodMovie =(id,name)=>{
    navigate(`/movies/${name}`)
    window.localStorage.setItem("Movie",JSON.stringify(id))
  }
 
  
   
   const result=data.filter((value,index)=>  value.category === "Web Series")
  
  return (
    <>
    <div className='w-full pt-16 pb-16 flex item-center justify-center flex-wrap bg-zinc-950 '>
    {result.map((val,index)=>{
 
 return (
  <div  onClick={()=>HandleBollywoodMovie(val._id,val.title)}key={index} className="card h-[65vh] w-[30vh] flex flex-col  flex-wrap mx-6 my-5 ">
  <div className="img w-[100%]   h-[65%]  ">
      <img   className='w-full h-full object-cover p-2 bg-gradient-to-r from-red-500 to-violet-400 hover:scale-105 transition-all duration-300' src={val.image} alt={val.title} />
  </div>
 <div className="text w-full h-30% mt-4">
 <h1 className='text-white text-center pb-2 text-lg'>{val.title}</h1>
 <p className='text-slate-500 text-center'>{val.description.split(" ").slice(0,10).join(" ")}</p>
 </div>
 </div>   
 )
 })}    
    </div>
     </>
  )
}

export default WebSeries