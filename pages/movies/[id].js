import { useRouter } from "next/router";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "../api/fetch";
import LoadingSpinner from "../../components/Loaders/LoadingSpinner";

const MovieById = () => {
  const router = useRouter();
  const movieId = router.query["id"];

  const {
    isLoading,
    isError,
    data: movie,
  } = useQuery(["movie", movieId], () => getMovieById(movieId));

  return (
    <main className="w-full flex flex-col items-center bg-gray-200 shadow-[inset_0_25px_50px_-12px_rgba(0,0,0,0.25)]">
      <section className="w-full max-w-[1920px] py-10 overflow-x-hidden xl:w-11/12 md:w-full">
        <div className="w-full px-20">
          {isLoading ? (
            <LoadingSpinner />
          ) : isError ? (
            <p className="text-center italic">
              Sorry, an error has occured. Unfortunately, this content
              isn&apos;t available.
            </p>
          ) : (
            <div
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
              }}
              className={`relative w-full h-[450px] flex items-center justify-start bg-cover bg-center before:absolute before:inset-0 before:bg-gradient-to-r before:from-black before:via-black/90 before:to-black/10`}
            >
              {/* <div className="overflow-hidden rounded-xl xl:h-[400px] lg:h-[450px] sm:h-[400px] ">
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  layout="fill"
                  objectFit="contain"
                  priority
                  alt={movie.title}
                />
              </div> */}

              <div className="text-white z-10">
                <h2 className="text-5xl">{movie.title}</h2>
                <p className="text-xl w-2/3">{movie.overview}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default MovieById;
