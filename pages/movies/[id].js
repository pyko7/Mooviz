import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getMovieById, getSimilarMovies } from "../api/fetch";
import LoadingSpinner from "../../components/Loaders/LoadingSpinner";
import MovieList from "../../components/MovieList";

const MovieById = () => {
  const router = useRouter();
  const movieId = router.query["id"];

  const {
    isLoading,
    isError,
    data: movie,
  } = useQuery(["movie", movieId], () => getMovieById(movieId));
  const similarMovies = useQuery(["movies", movieId], () =>
    getSimilarMovies(movieId)
  );

  const releaseDate = console.log();
  return (
    <main className="w-full flex flex-col items-center bg-gray-200 shadow-[inset_0_25px_50px_-12px_rgba(0,0,0,0.25)]">
      <section className="w-full max-w-[1920px] flex flex-col gap-y-32 py-10 overflow-x-hidden xl:w-11/12 md:w-full">
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
              className={`relative w-full h-[450px] py-20 px-8 flex bg-cover bg-center before:absolute before:inset-0 before:bg-gradient-to-r before:from-black before:via-black/90 before:to-black/10`}
            >
              <div className="w-1/2 flex flex-col gap-y-7 text-white z-10">
                <div className="flex flex-col gap-y-3">
                  <h2 className="w-full font-medium text-5xl">
                    {movie.title}{" "}
                    <span className="text-4xl italic font-normal">
                      ({movie.release_date.slice(0, 4)})
                    </span>
                  </h2>
                  <p className="w-3/4 text-lg italic">{movie.tagline}</p>
                </div>
                <p className="w-3/4 text-xl">{movie.overview}</p>
              </div>
            </div>
          )}
        </div>
        <div className="w-full px-20">
          {similarMovies.isLoading ? (
            <LoadingSpinner />
          ) : similarMovies.isError ? (
            <p className="text-center italic">
              Sorry, an error has occured. Unfortunately, this content
              isn&apos;t available.
            </p>
          ) : (
            <div>
              <h2 className="mb-8 text-xl tracking-wide uppercase font-bold">
                Similar movies
              </h2>
              <MovieList movies={similarMovies.data.results.slice(0, 18)} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default MovieById;
