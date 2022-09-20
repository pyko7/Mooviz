import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import {
  getMovieById,
  getMoviesCredits,
  getSimilarMovies,
} from "../../utils/fetch";
import LoadingSpinner from "../../components/Loaders/LoadingSpinner";
import MovieList from "../../components/Lists/MovieList";
import ProgressBar from "../../components/ProgressBar";
import ActorList from "../../components/Lists/ActorList";

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  const movieId = context.params.id;
  await queryClient.prefetchQuery(["movie", movieId], () =>
    getMovieById(movieId)
  );
  await queryClient.prefetchQuery(["movies", movieId], () =>
    getSimilarMovies(movieId)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const MovieById = () => {
  const router = useRouter();
  const movieId = router.query["id"];

  const {
    isLoading,
    isError,
    data: movie,
  } = useQuery(["movie", movieId], () => getMovieById(movieId));
  const credits = useQuery(["credits", movieId], () =>
    getMoviesCredits(movieId)
  );
  const similarMovies = useQuery(["movies", movieId], () =>
    getSimilarMovies(movieId)
  );

  const userScore = Math.trunc((movie?.vote_average / 10) * 100);
  const movieRuntimeHours = Math.floor(movie?.runtime / 60);
  const movieRuntimeMinutes = movie?.runtime % 60;

  const getconfig = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/configuration?api_key=1572fc5392807a01e4a54adcabbdf12d"
    );
    const data = await res.json();
    console.log(data);
    return data;
  };

  getconfig();

  return (
    <>
      {movie && (
        <Head>
          <title>{movie.title}</title>
          <meta name="description" content={movie.overview} />
          {/* Open Graph */}
          <meta property="og:description" content={movie.overview} />
          <meta property="og:title" content={movie.title} />
        </Head>
      )}

      <section className="w-full max-w-[1920px] flex flex-col gap-y-32 py-10 overflow-x-hidden xl:w-11/12 md:w-full">
        <div className="w-full px-20 lg:px-6 md:px-0">
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
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
              }}
              className={`relative w-full h-[550px] px-8 flex items-center bg-cover bg-center before:absolute before:inset-0 before:bg-gradient-to-r before:from-black before:via-black/90 before:to-black/10 xl:justify-start md:px-6 sm:h-[525px]`}
            >
              <div className="w-3/5 flex flex-col gap-y-7 text-white z-10 lg:w-2/3 sm:gap-y-4 sm:w-11/12">
                <div className="flex flex-col gap-y-3">
                  <h2 className="w-full font-medium text-5xl xl:text-3xl">
                    {movie.title}
                    <span className="text-4xl italic font-normal xl:text-xl lg:text-lg">
                      ({movie.release_date.slice(0, 4)})
                    </span>
                  </h2>
                  <div className="w-full flex gap-x-3 sm:gap-x-2 sm:text-sm">
                    {movie.genres?.map((genre) => {
                      return (
                        <Link
                          href={{
                            pathname: "/movies/genre/[id]",
                            query: { id: genre.id, name: genre.name },
                          }}
                          as={`/movies/genre/${genre.id}`}
                          key={genre.id}
                        >
                          <a className="italic hover:underline">{genre.name}</a>
                        </Link>
                      );
                    })}
                    <span>-</span>
                    <p>
                      {movieRuntimeHours}h{movieRuntimeMinutes}
                    </p>
                  </div>
                  <p className="w-3/4 text- italic xl:text-base lg:w-full sm:text-sm">
                    {movie.tagline}
                  </p>
                </div>
                <div className="w-3/4 text-lg xl:text-base lg:w-full sm:flex sm: items-center sm:gap-x-4">
                  <ProgressBar percentage={userScore} />
                  <p className="text-base italic mt-2 sm:text-sm">
                    (based on {movie.vote_count} votes)
                  </p>
                </div>
                <div>
                  <h2 className="mb-2 text-xl">Overview</h2>
                  <p className="w-2/3 text-base xl:w-4/5 xl:text-base lg:w-11/12 sm:w-full sm:text-sm sm:line-clamp-[12]">
                    {movie.overview}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-3 tracking-wide uppercase dark:text-white">
            Cast
          </h3>
          <ActorList actors={credits} />
        </div>
        <div className="w-full px-20 dark:text-white lg:px-6">
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
    </>
  );
};

export default MovieById;
