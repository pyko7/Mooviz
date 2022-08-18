import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getMoviesByGenre } from "../../api/fetch";
import MovieList from "../../../components/MovieList";
import LoadingSpinner from "../../../components/Loaders/LoadingSpinner";

const MovieListByGenre = () => {
  const router = useRouter();
  const genreId = router.query["id"];
  const genreName = router.query["name"];

  const { isLoading, isError, data } = useQuery(["genres", genreId], () =>
    getMoviesByGenre(genreId)
  );

  return (
    <main className="w-full flex flex-col items-center bg-gray-200 shadow-[inset_0_25px_50px_-12px_rgba(0,0,0,0.25)]">
      <section className="w-full max-w-[1920px] py-10 overflow-x-hidden xl:w-11/12 md:w-full">
        <div className="w-full px-20">
          <h2 className="mb-8 text-xl tracking-wide uppercase font-bold">
            {genreName}'s most popular this week
          </h2>
          {isLoading ? (
            <LoadingSpinner />
          ) : isError ? (
            <p className="text-center italic">
              Sorry, an error has occured. Unfortunately, this content
              isn&apos;t available.
            </p>
          ) : (
            <MovieList movies={data.results} />
          )}
        </div>
      </section>
    </main>
  );
};

export default MovieListByGenre;
