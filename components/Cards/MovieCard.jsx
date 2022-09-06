import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import defaultPoster from "../../public/assets/default_movie.webp"

const MovieCard = ({ movie, search }) => {
    const [overlay, setOverlay] = useState(0)

    const handleOverlay = (itemId) => {
        return overlay === 0 ? setOverlay(itemId) : setOverlay(0);
    }

    return (
        <Link href={{
            pathname: "/movies/[id]",
            query: { id: movie.id },
        }}
            as={`/movies/${movie.id}`}
        >
            <a aria-label={movie.title}>
                <article className="relative" onMouseOver={() => setOverlay(movie.id)} onMouseOut={() => setOverlay(0)} onClick={() => handleOverlay(movie.id)} >
                    <>
                        {overlay === movie.id ?
                            <div className="absolute inset-0 w-full h-full p-4 bg-black/95 text-white rounded-xl z-10 lg:hidden">
                                <div className="w-11/12 h-full flex flex-col gap-y-3">
                                    <h3 className=" text-lg font-bold line-clamp-3 hover:underline xl:w-4/5 lg:text-2xl md:w-11/12 md:text-lg sm:text-lg">{movie.title}</h3>
                                    <p className="line-clamp-[7] text-base md:text-sm sm:text-xs">{movie.overview}</p>
                                </div>
                            </div>
                            : null}
                    </>
                    <div className="w-full h-full flex flex-col lg:gap-y-4">
                        <div className="relative w-full h-[300px] overflow-hidden rounded-xl">
                            {movie.poster_path !== null ?
                                <Image src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} layout="fill" sizes="(min-width: 75em) 33vw, (min-width: 48em) 50vw, 100vw" objectFit="contain" priority alt={movie.title} />
                                :
                                <Image src={defaultPoster} layout="fill" sizes="(min-width: 75em) 33vw, (min-width: 48em) 50vw, 100vw" objectFit="contain" priority alt={movie.title} />
                            }
                        </div>
                        <div className="hidden lg:flex lg:w-full lg:h-full lg:flex-col lg:gap-y-4">
                            <div className="lg:w-full lg:flex lg:flex-col lg:gap-y-2">

                                <h3 className={`${search ? 'lg:text-white' : null} lg:w-full lg:font-bold lg:text-xl lg:line-clamp-2 md:text-lg sm:text-lg`}>{movie.title}</h3>
                                <p className={`${search ? 'lg:text-white' : null} line-clamp-[6] lg:text-sm md:text-sm sm:text-sm`}>{movie.overview}</p>
                            </div>
                        </div>
                    </div>
                </article>
            </a>

        </Link>
    );
}

export default MovieCard;
