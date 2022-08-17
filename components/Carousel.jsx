import Image from "next/image";
import thor from "../public/assets/thor.jpg";
import { useEffect, useState } from "react";

const Carousel = ({ movies }) => {
  const moviesList = movies.results.slice(0, 3);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleAutoPlay = setInterval(() => {
      if (index === moviesList.length - 1) {
        setIndex(0)
      } else {
        setIndex(index + 1)
      }
    }, 5000);
    return () => clearInterval(handleAutoPlay)
  }, [index, moviesList.length])

  return (
    //Carousel
    <div className="w-2/3 my-0 mx-auto overflow-hidden rounded-xl xl:w-full md:rounded-none">
      <div className={`whitespace-nowrap duration-1000 ease-in rounded-b-xl`} style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }} >
        {moviesList.map((movie, index) => {
          return (
            <div key={index} className="relative inline-block w-full ">
              <div className="relative w-full h-[600px] overflow-hidden rounded-b-xl xl:h-[550px] lg:h-[450px] md:h-80 sm:h-72 ">
                <Image src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} layout="fill" objectFit="cover" priority alt={movie.title} />
              </div>
              <div className="absolute bottom-0 w-full h-32 py-2 px-8 flex flex-col items-center justify-center gap-y-2 text-white bg-black/90 rounded-b-xl text-start whitespace-normal overflow-ellipsis md:h-28 md:rounded-none sm:h-28">
                <h2 className="w-full text-3xl text-center font-bold line-clamp-1 xl:w-4/5 lg:text-xl md:w-11/12 md:text-lg sm:text-lg">{movie.title}</h2>
                <p className="w-2/3 line-clamp-2 lg:text-md md:text-sm sm:w-5/6 sm:text-xs">{movie.overview}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="text-center">
        {moviesList.map((_, idx) => {
          return (
            <div key={idx}
              className={`inline-block w-5 h-5 rounded-[50%] cursor-pointer bg-red-800 mt-4 mr-3 ${index === idx ? "bg-red-400" : ""} xl:w-4 xl:h-4`}
              onClick={() => { setIndex(idx) }}
            ></div>
          )
        })}
      </div>
    </div>
  );
};

export default Carousel;
