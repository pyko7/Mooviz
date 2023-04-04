import { useEffect } from "react";
import Head from "next/head";
import MovieList from "../../components/Lists/MovieList";
import GenresList from "@/components/Lists/GenresList";
import Skeleton from "@/components/Loaders/Skeleton";
import ListSkeleton from "@/components/Loaders/ListSkeleton";
import PosterSkeleton from "@/components/Loaders/PosterSkeleton";
import { useGenreContext } from "@/context/MoviesGenreContext";

const Movies = () => {
  const {
    activeTabIndex,
    genresList,
    popularMovies,
    moviesList,
    getPopularMovies,
  } = useGenreContext();

  useEffect(() => {
    if (moviesList.length === 0 || activeTabIndex === 0) {
      getPopularMovies();
    }
  }, [moviesList.length, activeTabIndex, getPopularMovies]);

  return (
    <>
      <Head>
        <title>Genres - Mooviz</title>
        <meta
          name="description"
          content="Choisissez le genre que vous aimez ou découvrez les films populaires du moment"
        />
        {/* Open Graph */}
        <meta property="og:title" content="Genres" />
        <meta
          property="og:description"
          content="Choisissez le genre que vous aimez ou découvrez les films populaires du moment"
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
          <GenresList genres={genresList.data.genres} />
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
