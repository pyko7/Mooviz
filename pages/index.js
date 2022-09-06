import Link from "next/link";
import { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Carousel from "../components/Carousel";
import LoadingSpinner from "../components/Loaders/LoadingSpinner";
import MovieList from "../components/MovieList";
import {
  getWeeklyPopularMovies,
  getGenresList,
  getMoviesByGenre,
} from "../utils/fetch";
import { ChevronRightIcon } from "@heroicons/react/solid";

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["carousel"], getWeeklyPopularMovies);
  await queryClient.prefetchQuery(["genres"], getGenresList);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}

export default function Home() {
  const [genreId, setGenreId] = useState(null);
  const [genreName, setGenreName] = useState(null);

  const carouselQuery = useQuery(["carousel"], getWeeklyPopularMovies);
  const genresQuery = useQuery(["genres"], getGenresList);
  const popularMoviesByGenre = useQuery(["movies", genreId], () =>
    getMoviesByGenre(genreId)
  );

  const handleGenre = (genre) => {
    if (genre.value === null || genre.name === undefined) {
      setGenreId(null);
      setGenreName(null);
    } else {
      setGenreId(genre.id);
      setGenreName(genre.name);
    }
    popularMoviesByGenre.refetch();
  };

  return (
    <>
      <section className="w-full max-w-[1920px] py-10 overflow-x-hidden xl:w-11/12 md:w-full">
        {carouselQuery.isLoading ? (
          <LoadingSpinner />
        ) : carouselQuery.isError ? (
          <p className="text-center italic">
            Sorry, an error has occured. Unfortunately, this content isn&apos;t
            available.
          </p>
        ) : (
          <Carousel movies={carouselQuery.data} />
        )}
      </section>
      <section className="w-full max-w-[1920px] py-10 px-14 flex flex-col gap-y-10 overflow-x-hidden xl:w-11/12 md:w-full md:px-8">
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
                <option value={null} onClick={(genre) => handleGenre(genre)}>
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
              <Link href={`/movies`}>
                <a className="w-fit flex items-center gap-x-1 font-medium hover:underline sm:text-lg">
                  <p>See all</p>
                  <ChevronRightIcon aria-hidden="true" className="w-5 h-5" />
                </a>
              </Link>
            ) : (
              <Link
                href={{
                  pathname: "/movies/genre/[id]",
                  query: { id: genreId, name: genreName },
                }}
                as={`/movies/genre/${genreId}`}
              >
                <a className="w-fit flex items-center gap-x-1 font-medium hover:underline sm:text-lg">
                  <p>See all</p>
                  <ChevronRightIcon aria-hidden="true" className="w-5 h-5" />
                </a>
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
      </section>
    </>
  );
}
