import React from 'react'

function Button(props) {
 
  let arr = [
    "All", "Bollywood", "English",  "Telugu", "Punjabi", "Tamil", "Hollywood","Hindi"
  ]
 const  HandleBtn=(btn)=>{
   props.categorys===btn ? props.update(props.categorys) : props.update(btn)
 }
  return (
    <>
     <div className="Button-sec flex items-center justify-center w-[100%] bg-zinc-950 flex-wrap px-10 pt-5 pb-5">
      {arr.map((btn,index)=>{
        return(
          <button className='text-white cursor-pointer border-2 font-semibold px-6 py-2 mx-2 my-2 rounded-lg bg-red-600 hover:bg-red-700' key={index} onClick={()=>HandleBtn(btn)}>{btn}</button>
        )
      })}
     </div>
    </>
  )
}

export default Button