import Image from "next/image";
import thor from "../public/assets/thor.jpg";
import { useEffect, useRef, useState } from "react";

const Carousel = ({ movie }) => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  //check if there's an array or not
  if (!Array.isArray(movie) || movie.length <= 0) return null;

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === movie.length - 1 ? 0 : prevIndex + 1
        ),
      5000
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    //Carousel
    <div className="w-2/3 my-0 mx-auto overflow-hidden rounded-xl xl:w-full md:rounded-none">
      <div className={`whitespace-nowrap duration-1000 ease-in rounded-b-xl`} style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }} >
        {movie.map((movie, index) => {
          return (
            <div key={index} className="relative inline-block w-full">
              <div className="relative w-full h-[600px] overflow-hidden rounded-b-xl xl:h-[550px] lg:h-[450px] md:h-80 sm:h-72 ">
                <Image src={thor} layout="fill" objectFit="cover" priority alt={movie.title} />
              </div>
              <div className="absolute bottom-0 w-full h-32 py-2 flex flex-col items-center justify-center gap-y-2 text-white bg-black/90 rounded-b-xl text-center whitespace-normal overflow-ellipsis md:rounded-none sm:h-28">
                <h2 className="w-11/12 text-3xl font-bold line-clamp-1 xl:w-4/5 sm:text-2xl">{movie.title}</h2>
                <p className="w-4/5 max-w-2xl my-0 mx-auto line-clamp-2 sm:w-5/6 sm:text-sm ">
                  {movie.body}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="text-center">
        {movie.map((_, idx) => {
          return (
            <div key={idx}
              className={`inline-block w-5 h-5 rounded-[50%] cursor-pointer bg-red-800 mt-4 mr-3 md:w-4 md:h-4 ${index === idx ? "bg-red-400" : ""}`}
              onClick={() => { setIndex(idx) }}
            ></div>
          )
        })}
        <span className="" />
      </div>
    </div>

  );
};

export default Carousel;
