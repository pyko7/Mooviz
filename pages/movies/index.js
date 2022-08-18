import { useQuery } from "@tanstack/react-query";
import GenreCard from "../../components/GenreCard";
import LoadingSpinner from "../../components//Loaders/LoadingSpinner";
import { getGenresList, getWeeklyPopularMovies } from "../api/fetch";
import MovieList from "../../components/MovieList";

const Movies = () => {
  const genresList = useQuery(["genres"], getGenresList);
  const popularMovies = useQuery(["movies"], getWeeklyPopularMovies);

  return (
    <main className="w-full flex flex-col items-center bg-gray-200 shadow-[inset_0_25px_50px_-12px_rgba(0,0,0,0.25)]">
      <section className="w-full max-w-[1920px] py-10 overflow-x-hidden xl:w-11/12 md:w-full">
        {genresList.isLoading ? (
          <LoadingSpinner />
        ) : genresList.isError ? (
          <h1>Error</h1>
        ) : (
          <div className="w-full px-20">
            {/* flex col reverse for md/sm ? */}
            <h2 className="mb-8 text-xl tracking-wide uppercase font-bold">
              Genres
            </h2>
            <div className="w-full grid grid-cols-5 gap-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {genresList.data.genres.map((genre) => (
                <GenreCard genre={genre} key={genre.id} />
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="w-full max-w-[1920px] py-10 overflow-x-hidden xl:w-11/12 md:w-full">
        <div className="w-full px-20">
          <h2 className="mb-8 text-xl tracking-wide uppercase font-bold">
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
    </main>
  );
};

export default Movies;
