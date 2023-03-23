import { useState } from "react";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { getGenresList } from "@/utils/getGenresList";
import { getWeeklyPopularMovies } from "@/utils/getWeeklyPopularMovies";
import GenreCard from "../../components/Cards/GenreCard";
import LoadingSpinner from "../../components/Loaders/LoadingSpinner";
import MovieList from "../../components/Lists/MovieList";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const Movies = () => {
  const [genres, setGenres] = useState(null);
  const genresList = useQuery(["genres"], getGenresList);
  const popularMovies = useQuery(["movies"], getWeeklyPopularMovies);

  const handleDisplayList = () => {
    return genres ? setGenres(null) : setGenres(true);
  };

  return (
    <>
      <Head>
        <title>Genres</title>
        <meta
          name="description"
          content="Select the genre you like or discover the most popular movies of the moment"
        />
        {/* Open Graph */}
        <meta property="og:title" content="Genres" />
        <meta
          property="og:description"
          content="Select the genre you like or discover the most popular movies of the moment"
        />
      </Head>

      <section className="w-full max-w-[1920px] py-10 overflow-x-hidden dark:text-white xl:w-11/12 md:w-full">
        {genresList.isLoading ? (
          <LoadingSpinner />
        ) : genresList.isError ? (
          <h1>Error</h1>
        ) : (
          <div className="w-full px-20 lg:px-8 md:px-14 sm:px-12">
            <div
              className="w-fit mb-8 flex items-center gap-x-2"
              onClick={() => handleDisplayList()}
            >
              <h2 className="text-xl tracking-wide uppercase font-bold">
                Genres
              </h2>
              <div className="hidden md:block">
                {genres ? (
                  <ChevronDownIcon aria-hidden="true" className="w-5 h-5" />
                ) : (
                  <ChevronRightIcon aria-hidden="true" className="w-5 h-5" />
                )}
              </div>
            </div>
            <div
              className={`w-full grid grid-cols-5 gap-6 xl:grid-cols-4 lg:grid-cols-3 ${
                genres ? "md:grid" : "md:hidden"
              } md:grid-cols-2 sm:grid-cols-1`}
            >
              {genresList.data.genres.map((genre) => (
                <GenreCard genre={genre} key={genre.id} />
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="w-full max-w-[1920px] py-10 overflow-x-hidden dark:text-white xl:w-11/12 md:w-full">
        <div className="w-full px-20 lg:px-8 md:px-14 sm:px-12">
          <h2 className="mb-8 text-xl tracking-wide uppercase font-bold sm:text-lg">
            The most popular this week
          </h2>
          {popularMovies.isLoading ? (
            <LoadingSpinner />
          ) : popularMovies.isError ? (
            <p className="text-center italic">
              Sorry, an error has occured. Unfortunately, this content
              isn&apos;t available.
            </p>
          ) : (
            <MovieList movies={popularMovies.data.results} />
          )}
        </div>
      </section>
    </>
  );
};

export default Movies;
