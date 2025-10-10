import React, { useState } from 'react';
import { IoIosClose, IoIosSearch } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';

function Search(props) {

    const [selectItem, setSelectItem] = useState(-1);
    const {movieID} = useParams()
    // console.log(movieID);
    
    const filterData = props.data.filter((val) =>{ 
        if (val.title.toLowerCase().includes(props.searchDet.toLowerCase())) {
         return val
        }
});

    const result = filterData.map(val => val.title);
    const tenValues= result.slice(0,10)
    const handleClose = () => {
        props.updateSearch("");
        setSelectItem(-1);  // Reset selected item on close
    };
   const sendData =(title)=>{
    props.updateSearch(title)
   }
    const handleDown = (e) => {
        if (e.key === "ArrowUp" && selectItem > 0) {
            setSelectItem((prev) => prev - 1);
        } else if (e.key === "ArrowDown" && selectItem < filterData.length - 1) {
            setSelectItem((prev) => prev + 1);
        } else if (e.key === "Enter" && selectItem >= 0) {
            props.updateSearch(result[selectItem]);
           
        }
    };

    return (
        <>
            <div className="search-sec w-full relative h-[8vh] bg-zinc-950 flex items-center justify-center border-b-2 border-cyan-400">
                <div className='w-full h-full flex justify-around items-center'>
                    <input
                        className='w-[88%] h-[85%] border-none outline-none text-white bg-zinc-950 placeholder:text-white placeholder:opacity-[0.6] px-5 focus:placeholder:opacity-0  focus:border focus:border-cyan-500'
                        type="text"
                        placeholder='Search Movies, Bollywood, Web Series'
                        value={props.searchDet}
                        onKeyDown={handleDown}
                        onChange={(event) => {
                            props.updateSearch(event.target.value);
                            setSelectItem(-1);  // Reset selection when typing
                        }}
                        style={{
                            borderRadius: props.searchDet === "" || (props.searchDet !== "" && result.length === 0)
                                ? "10%" : "10% 10% 0% 0%"
                        }}
                    />
                    {props.searchDet === "" 
                        ? <IoIosSearch className='text-white text-2xl cursor-pointer' /> 
                        : <IoIosClose className='text-white text-3xl cursor-pointer' onClick={handleClose} />}
                </div>

                {props.searchDet!== "" && (
                    <div className='w-full rounded-b-lg flex flex-col pt-6 px-4  absolute left-0 top-[73%] bg-opacity-70 bg-black'>
                        {!result.includes(props.searchDet) ? tenValues.map((text, index) => (
                            <Link
                            to={`/Home/:${text}`}
                                key={index}
                                className={`text-sm py-4 pl-10 text-white transition-all ${selectItem === index ? 'bg-zinc-500'  : 'bg-transparent'}`}
                                href={text}
                             onClick={()=>sendData(text)}
                            >
                                {text}
                            </Link>
                        )):null}
                    </div>
                )}
            </div>
        </>
    );
}

export default Search;
