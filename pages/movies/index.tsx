import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { getGenresList } from "@/utils/api/getGenresList";
import { getWeeklyPopularMovies } from "@/utils/api/getWeeklyPopularMovies";
import LoadingSpinner from "../../components/Loaders/LoadingSpinner";
import MovieList from "../../components/Lists/MovieList";
import GenresList from "@/components/Lists/GenresList";
import { HomepageMovies } from "@/types/movies";
import Skeleton from "@/components/Loaders/Skeleton";
import ListSkeleton from "@/components/Loaders/ListSkeleton";
import PosterSkeleton from "@/components/Loaders/PosterSkeleton";

const Movies = () => {
  const [moviesList, setMoviesList] = useState<HomepageMovies[]>([]);

  const genresList = useQuery(["genres"], getGenresList, {
    staleTime: 30 * (60 * 1000), // 30 mins
    cacheTime: 45 * (60 * 1000), // 45 mins
  });
  const popularMovies = useQuery(["movies"], getWeeklyPopularMovies, {
    staleTime: 30 * (60 * 1000), // 30 mins
    cacheTime: 45 * (60 * 1000), // 45 mins
  });

  const handlePopularMovies = useCallback(() => {
    if (typeof popularMovies.data !== "undefined") {
      setMoviesList(popularMovies.data.results);
    }
    return;
  }, [popularMovies.data]);

  useEffect(() => {
    handlePopularMovies();
  }, [handlePopularMovies]);

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

      <section className="w-full max-w-[1920px] py-10 px-4">
        {genresList.isLoading ? (
          <div className="mt-24">
            <Skeleton width={"100%"} height={50} />
          </div>
        ) : genresList.isError ? (
          <h1>Error</h1>
        ) : (
          <GenresList
            genres={genresList.data.genres}
            setMoviesList={setMoviesList}
            handlePopularMovies={handlePopularMovies}
          />
        )}

        <div className="w-full mt-10">
          {popularMovies.isLoading ? (
            <ListSkeleton length={20} wrap>
              <PosterSkeleton />
            </ListSkeleton>
          ) : popularMovies.isError ? (
            <p className="text-center italic">
              Sorry, an error has occured. Unfortunately, this content
              isn&apos;t available.
            </p>
          ) : (
            <MovieList movies={moviesList} />
          )}
        </div>
      </section>
    </>
  );
};

export default Movies;
