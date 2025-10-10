import React from 'react'
import { useNavigate } from 'react-router-dom'


function Card(props) {
  
  const navigate=useNavigate()
  const handleMovie =(id,name,href)=>{
    navigate(`/movies/${name}`)
    window.localStorage.setItem("Movie",JSON.stringify(id))
   }
  
   
  return (
 <>
 <div onClick={()=>handleMovie(props.val._id,props.val.title,props.val.url)} key={props.val.index} className="card h-[65vh] w-[30vh] flex flex-col  mx-6 my-5 ">
    <div className="img w-full h-[65%]">
        <img  className='w-full h-full object-cover p-2 bg-gradient-to-r from-red-500 to-violet-400 hover:scale-105 transition-all duration-300' src={props.val.image} alt={props.val.title} />
    </div>
   <div className="text w-full h-30% mt-4">
   <h1 className='text-white text-center pb-2 text-lg'>{props.val.title}</h1>
   <p className='text-slate-500 text-center'>{props.val.description.split(" ").slice(0,10).join(" ")}</p>
   </div>
 </div>
 </>
  )
}

export default Card