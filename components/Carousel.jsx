import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

const Carousel = ({ movies }) => {
  const moviesList = movies.results.slice(0, 3);

  const [index, setIndex] = useState(0);

  const handleNextIndex = () => {
    if (index === moviesList.length - 1) {
      setIndex(0)
    } else {
      setIndex(index + 1)
    }
  }

  const handlePreviousIndex = () => {
    if (index === 0) {
      setIndex(moviesList.length - 1)
    } else {
      setIndex(index - 1)
    }
  }

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
    <div className="w-2/3 my-0 mx-auto overflow-hidden rounded-xl xl:w-full md:rounded-none"  >
      <div className="whitespace-nowrap duration-1000 ease-in rounded-b-xl" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {moviesList.map((movie, index) => {
          return (
            <Link href={`/movies/${movie.id}`} key={index} onK>
              <a tabIndex="-1">
                <div className="relative inline-block w-full">
                  <div className="relative w-full h-[600px] overflow-hidden rounded-b-xl xl:h-[550px] lg:h-[450px] md:h-80 sm:h-72 ">
                    <Image src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`} layout="fill"  objectFit="cover" priority alt={movie.title} />
                  </div>
                  <div className="absolute bottom-0 w-full h-32 py-2 px-8 flex flex-col items-center justify-center gap-y-2 text-white bg-black/90 rounded-b-xl text-start whitespace-normal overflow-ellipsis focus-visible:outline focus-visible:outline-red-500 md:h-28 md:rounded-none sm:h-28" tabIndex="0">
                    <h2 className="w-full text-3xl text-center font-bold line-clamp-1 xl:w-4/5 lg:text-xl md:w-11/12 md:text-lg sm:text-lg" >{movie.title}</h2>
                    <p className="w-2/3 max-w-xl line-clamp-2 lg:text-base md:w-4/5 md:max-w-none md:text-sm sm:w-5/6 sm:text-sm">{movie.overview}</p>
                  </div>
                </div>
              </a>
            </Link>
          )
        })}
      </div>

      <div className="w-full flex mt-4 items-center justify-end gap-x-3 dark:text-gray-200" >
        <ChevronLeftIcon className="w-7 h-7 cursor-pointer focus-visible:outline focus-visible:outline-red-500" onClick={() => handlePreviousIndex()} />
        <ChevronRightIcon className="w-7 h-7 cursor-pointer focus-visible:outline focus-visible:outline-red-500" onClick={() => handleNextIndex()} />
      </div>
    </div>
  );
};

export default Carousel;
