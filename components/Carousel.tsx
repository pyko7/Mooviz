import { CarouselMoviesList } from "@/types/movies";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Carousel = ({ movies }: CarouselMoviesList) => {
  const moviesList = movies.slice(0, 3);
  const [index, setIndex] = useState(0);

  const handleClick = (index: number) => {
    setIndex(index);
  };

  useEffect(() => {
    const handleAutoPlay = setInterval(() => {
      if (index === moviesList.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }, 5000);

    return () => clearInterval(handleAutoPlay);
  }, [index, moviesList.length]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className=" whitespace-nowrap duration-1000 ease-in"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {moviesList.map((movie, imgIndex) => {
          return (
            <div
              className="relative inline-block w-full overflow-hidden"
              key={imgIndex}
            >
              <div className="relative w-full h-[900px] image_container">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  fill
                  className="object-cover"
                  priority
                  alt={movie.title}
                />
              </div>
              <div className="carousel_movie_infos" tabIndex={0}>
                <p className="w-full text-3xl font-bold line-clamp-1">
                  {movie.title}
                </p>

                <p className="w-2/3 max-w-xl line-clamp-4 lg:text-base md:w-4/5 md:max-w-none md:text-sm sm:w-5/6 sm:text-sm">
                  {movie.overview}
                </p>
                <Link
                  href={`/movies/${movie.id}`}
                  className="w-full max-w-xs py-4 mt-12 text-center bg-red-600 rounded-md uppercase font-bold
                hover:bg-red-500"
                >
                  See more
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <ul className="absolute bottom-5 right-5 flex gap-3">
        {moviesList.map((movie, imgIndex) => {
          return (
            <li key={imgIndex}>
              <button
                type="button"
                className={`w-3 h-3 rounded-[50%] ${
                  index !== imgIndex ? "bg-neutral-600" : "bg-neutral-200"
                } hover:bg-neutral-200 cursor-pointer`}
                key={index}
                onClick={() => handleClick(index)}
              ></button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Carousel;
