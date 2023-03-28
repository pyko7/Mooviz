import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Carousel from "../components/Carousel";
import LoadingSpinner from "../components/Loaders/LoadingSpinner";
import { getWeeklyPopularMovies } from "@/utils/api/getWeeklyPopularMovies";
import { getGenresList } from "../utils/api/getGenresList";
import { getMoviesByGenre } from "../utils/api/getMoviesByGenre";
import { PopularMoviesByGenre } from "@/types/movies";
import ProvidersList from "@/components/Lists/ProvidersList";
import MoviesListByGenre from "@/components/Lists/MoviesListByGenre";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const [popularMoviesByGenre, setPopularMoviesByGenre] = useState<
    PopularMoviesByGenre[]
  >([]);

  const moviesList = useQuery(["carousel"], getWeeklyPopularMovies, {
    staleTime: 30 * (60 * 1000), // 30 mins
    cacheTime: 45 * (60 * 1000), // 45 mins
  });
  const genresList = useQuery(["genres"], getGenresList, {
    staleTime: 30 * (60 * 1000), // 30 mins
    cacheTime: 45 * (60 * 1000), // 45 mins
  });

  useEffect(() => {
    const getPopularMoviesByGenre = async () => {
      if (typeof genresList.data === "undefined") {
        return;
      }
      for (const genre of genresList.data.genres) {
        const moviesByGenre = await getMoviesByGenre(genre.id);

        setPopularMoviesByGenre((popularMoviesByGenre) => [
          ...popularMoviesByGenre,
          {
            genre: genre.name,
            movies: moviesByGenre.results,
          },
        ]);
      }
    };
    getPopularMoviesByGenre();
  }, [genresList.data]);

  return (
    <>
      <section className="w-full">
        {moviesList.isLoading ? (
          <LoadingSpinner />
        ) : moviesList.isError ? (
          <p className="text-center italic">
            Sorry, an error has occured. Unfortunately, this content isn&apos;t
            available.
          </p>
        ) : (
          <Carousel movies={moviesList.data.results} />
        )}
      </section>

      <section className="w-full py-6 px-4">
        <h2 className="text-2xl uppercase font-bold xl:text-xl sm:text-lg">
          Providers
        </h2>
        <ProvidersList />
        {popularMoviesByGenre?.map((movies) => (
          <div className="w-full" key={movies.genre}>
            <div className="w-full pr-2 flex justify-between uppercase sm:mt-10">
              <h2 className="text-2xl font-bold xl:text-xl sm:text-lg">
                {movies.genre}
              </h2>
              <Link
                href={{
                  pathname: "/movies/genre/[id]",
                  query: { id: movies.genre, name: movies.genre },
                }}
                as={`/movies/genre/${movies.genre}`}
                className="w-fit flex items-center gap-x-1 font-medium hover:underline sm:text-lg"
              >
                <p>See all</p>
                <ChevronRightIcon aria-hidden="true" className="w-5 h-5" />
              </Link>
            </div>
            <MoviesListByGenre movies={movies.movies} />
          </div>
        ))}
      </section>

      {/* <section className="w-full max-w-[1920px] py-10 px-14 flex flex-col gap-y-10 overflow-x-hidden xl:w-11/12 md:w-full md:px-8">
        <div>
          <select
            name="genres"
            id="genres"
            className="p-2 rounded-[4px] font-medium bg-white shadow-md dark:bg-neutral-400"
          >
            {genresQuery.isLoading || genresQuery.isFetching ? (
              <option value="Loading">Loading...</option>
            ) : genresQuery.isError ? null : (
              <>
                <option
                  value={genreName}
                  onClick={(genre) => handleGenre(genre)}
                >
                  Genres
                </option>
                {genresQuery.data.genres?.map((genre) => {
                  return (
                    <option
                      value={genre.name}
                      key={genre.id}
                      onClick={() => handleGenre(genre)}
                    >
                      {genre.name}
                    </option>
                  );
                })}
              </>
            )}
          </select>
        </div>
        <div className="w-full flex flex-col gap-y-6 dark:text-white">
          <div className="w-full flex justify-between items-center uppercase sm:gap-x-4 sm:flex-wrap">
            <h2 className="text-xl tracking-wide font-bold sm:text-lg">
              {genreName === null
                ? "Popular right now"
                : `${genreName}'s most popular`}
            </h2>
            {genreId === null ? (
              <Link
                href={`/movies`}
                className="w-fit flex items-center gap-x-1 font-medium hover:underline sm:text-lg"
              >
                <p>See all</p>
                <ChevronRightIcon aria-hidden="true" className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                href={{
                  pathname: "/movies/genre/[id]",
                  query: { id: genreId, name: genreName },
                }}
                as={`/movies/genre/${genreId}`}
                className="w-fit flex items-center gap-x-1 font-medium hover:underline sm:text-lg"
              >
                <p>See all</p>
                <ChevronRightIcon aria-hidden="true" className="w-5 h-5" />
              </Link>
            )}
          </div>
          {popularMoviesByGenre.isLoading ? (
            <LoadingSpinner />
          ) : popularMoviesByGenre.isError ? (
            <p className="text-center italic">
              Sorry, an error has occured. Unfortunately, this content
              isn&apos;t available.
            </p>
          ) : (
            <MovieList movies={popularMoviesByGenre.data.results.slice(0, 6)} />
          )}
        </div>
      </section> */}
    </>
  );
}
