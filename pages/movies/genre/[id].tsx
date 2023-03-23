import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { getMoviesByGenre } from "@/utils/getMoviesByGenre";
import MovieList from "@/components/Lists/MovieList";
import LoadingSpinner from "@/components/Loaders/LoadingSpinner";

const MovieListByGenre = () => {
  const router = useRouter();
  const genreId = router.query["id"];
  const genreName = router.query["name"];

  const { isLoading, isError, data } = useQuery(["genres", genreId], () =>
    getMoviesByGenre(genreId)
  );

  /**
   * In case of refresh, page title and h2 don't have the right value anymore due to inexistant query
   */
  return (
    <>
      {genreName && (
        <Head>
          <title>{genreName}</title>
          <meta
            name="description"
            content={`Find a movie in the ${genreName}'s list `}
          />
          {/* Open Graph  */}
          <meta
            property="og:description"
            content={`Find a movie in the ${genreName}'s list `}
          />
          <meta property="og:title" content={`${genreName}`} />
        </Head>
      )}

      <section className="w-full max-w-[1920px] py-10 overflow-x-hidden xl:w-11/12 md:w-full">
        <div className="w-full px-20 dark:text-white md:px-14 sm:px-12">
          <h2 className="mb-8 text-xl tracking-wide uppercase font-bold xl:mb-0 sm:mb-4 sm:text-lg">
            {genreName}&apos;s most popular this week
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
    </>
  );
};

export default MovieListByGenre;
