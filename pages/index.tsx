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
    </>
  );
}
