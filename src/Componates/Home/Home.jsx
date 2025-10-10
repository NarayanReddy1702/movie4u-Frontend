import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import Button from "../Button/Button";
import Search from "../Search/Search";
import { BASE_URL } from "../../config";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);
  const [categorys, setCategorys] = useState("All");
  const [searchDet, setSearchDet] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const token = localStorage.getItem("token")
        console.log(token);

        if (!token) {
          console.log("No token found. Please login first.");
        }
        const res = await axios.get(`${BASE_URL}api/movie/`, {
          withCredentials: true,
        });
        // console.log(res.data);

        if (res.data?.success) {
          setData(res.data.allMovies);
        } else {
          console.log(res.data.message);
        }
      } catch (error) {
        console.log(
          "Error fetching movies:",
          error.response?.data || error.message
        );
      }
    };

    getMovies();
  }, []);

  const ITEMS_PER_PAGE = 15;
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  // console.log("Start Index",startIndex);
  // console.log("Ending index",endIndex);

  const getCurrentPageData = (dataToSlice) => {
    return dataToSlice.slice(startIndex, endIndex);
  };

  const showMore = () => {
    if ((currentPage + 1) * ITEMS_PER_PAGE < data.length) {
      setCurrentPage((incre) => incre + 1);
    }
  };

  const getPreviousData = () => {
    if (currentPage > 0) {
      setCurrentPage((decre) => decre - 1);
    }
  };

  const filteredData =
    categorys === "All"
      ? data
      : data.filter((val) => val.category === categorys);
  //cuurent 0 -> startIndex=0*15=0 endingIndex=0+15=15
  const displayData =
    searchDet === ""
      ? getCurrentPageData(filteredData)
      : data.filter((val) =>
          val.title.toLowerCase().includes(searchDet.toLowerCase())
        );
  // console.log("Filter Length",filteredData.length);
  // console.log("Filter",filteredData);
  // console.log("current ",currentPage);

  return (
    <>
      <Search updateSearch={setSearchDet} searchDet={searchDet} data={data} />
      <Button update={setCategorys} categorys={categorys} />
      {displayData.length === 0 ? (
        "Loading"
      ) : (
        <div className="home-sec w-full min-h-screen bg-black">
          <div className="card-container w-full flex flex-wrap items-center justify-center px-8 pt-7">
            {displayData.map((val, index) => (
              <Card
                categorys={categorys}
                update={setCategorys}
                key={index}
                val={val}
              />
            ))}
          </div>
          {!searchDet && (
            <div className="flex items-start h-20 gap-x-6 justify-center">
              <button
                className="border-blue-600 border-2 bg-blue-500 px-10 py-2 text-white text-center text-sm font-medium hover:bg-transparent hover:text-blue-600"
                onClick={getPreviousData}
                disabled={startIndex === 0}
              >
                Previous
              </button>
              <button
                className="border-blue-600 border-2 bg-blue-500 px-10 py-2 text-white text-center text-sm font-medium hover:bg-transparent hover:text-blue-600"
                onClick={showMore}
                disabled={endIndex >= filteredData.length}
              >
                More+
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Home;
