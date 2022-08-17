import Image from "next/image"
import { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/solid";

const MovieCard = ({ movies }) => {
    const [overlay, setOverlay] = useState(0)
    const moviesList = movies.results.slice(0, 8);

    const handleOverlay = (itemId) => {
        return overlay === 0 ? setOverlay(itemId) : setOverlay(0);
    }

    return (
        <>
            {moviesList.map((movie) => {
                return (
                    <article className="relative w-1/4 xl:min-w-[390px] lg:w-full lg:min-w-[auto] md:w-full" key={movie.id} onMouseOver={() => setOverlay(movie.id)} onMouseOut={() => setOverlay(0)} onClick={() => handleOverlay(movie.id)} >
                        {overlay === movie.id ?
                            <div className="absolute inset-0 w-full h-full p-4 bg-black/95 text-white rounded-xl z-10 lg:p-6">
                                <div className="w-11/12 h-full flex flex-col gap-y-3">
                                    <h3 className=" text-lg font-bold line-clamp-3 xl:w-4/5 lg:text-2xl md:w-11/12 md:text-lg sm:text-lg">{movie.title}</h3>
                                    <p className="line-clamp-[7] text-base md:text-sm sm:text-xs">{movie.overview}</p>
                                </div>
                            </div>
                            : null}
                        <div className="w-full flex flex-col gap-y-4">
                            <div className="relative w-full h-[300px] overflow-hidden rounded-xl xl:h-[400px] lg:h-[450px] md:h-80 sm:h-72 ">
                                <Image src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} layout="fill" objectFit="contain" priority alt={movie.title} />
                            </div>
                            <div className="hidden lg:flex lg:w-full lg:h-full lg:flex-col lg:gap-y-4">
                                <div className="lg:w-full lg:flex lg:flex-col">
                                    <h3 className="lg:w-full lg:font-bold lg:text-xl lg:line-clamp-2 md:text-lg sm:text-lg">{movie.title}</h3>
                                    <p className="line-clamp-[6] lg:text-base md:text-sm sm:text-xs">{movie.overview}</p>
                                </div>
                                <div className="hidden lg:w-full lg:flex lg:justify-end lg:items-center lg:gap-x-2">
                                    <p className="lg:text-lg lg:font-medium md:text-base">Go to page</p>
                                    <ChevronRightIcon className="lg:w-5 lg:h-5" />
                                </div>
                            </div>
                        </div>
                    </article>
                )
            })
            }
        </>
    );
}

export default MovieCard;
