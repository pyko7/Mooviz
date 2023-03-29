import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "@/utils/api/getMovieById";
import { getMovieCredits } from "@/utils/api/getMovieCredits";
import { getSimilarMovies } from "@/utils/api/getSimilarMovies";
import LoadingSpinner from "../../components/Loaders/LoadingSpinner";
import MovieList from "../../components/Lists/MovieList";
import ProgressBar from "../../components/ProgressBar";
import ActorList from "../../components/Lists/ActorList";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getMovieStats } from "@/utils/getMovieStats";
import { MovieStats } from "@/types/movies";
import CrewList from "@/components/Lists/CrewList";

const MovieById = () => {
  const [mobile, setMobile] = useState(false);
  const [movieStats, setMovieStats] = useState<MovieStats>({
    score: 0,
    hour: 0,
    minutes: 0,
  });

  const { query } = useRouter();
  const movieId = parseInt(query.id as string);

  const {
    isLoading,
    isError,
    data: movie,
  } = useQuery(["movie", movieId], () => getMovieById(movieId));
  const credits = useQuery(["credits", movieId], () =>
    getMovieCredits(movieId)
  );
  const similarMovies = useQuery(["movies", movieId], () =>
    getSimilarMovies(movieId)
  );

  useEffect(() => {
    if (typeof movie !== "undefined") {
      const { score, hour, minutes } = getMovieStats(
        movie?.vote_average,
        movie?.runtime
      );
      setMovieStats({ score, hour, minutes });
    }
  }, [movie]);

  useEffect(() => {
    const getWindowSize = () => {
      if (window.innerWidth < 576) {
        setMobile(true);
      }
    };
    getWindowSize();
  }, []);

  return (
    <>
      {movie ? (
        <Head>
          <title>{movie.title}</title>
          <meta name="description" content={movie.overview} />
          {/* Open Graph */}
          <meta property="og:description" content={movie.overview} />
          <meta property="og:title" content={movie.title} />
        </Head>
      ) : null}

      <section className="w-full">
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <p className="text-center italic">
            Sorry, an error has occured. Unfortunately, this content isn&apos;t
            available.
          </p>
        ) : (
          <div className="relative inline-block w-full">
            <div className="poster_container relative w-full h-[900px] sm:h-auto sm:min-h-screen">
              <Image
                src={
                  !mobile
                    ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                    : `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                }
                fill
                className="object-cover"
                priority
                alt={movie.title}
              />
            </div>

            <div
              className="absolute top-1/2 -translate-y-1/2 left-0 w-full px-20 flex flex-col gap-6 z-10 xl:px-10 
                sm:top-3/4 sm:left-1/2 sm:-translate-x-1/2 sm:items-center sm:px-4 sm:gap-3 sm:bg-gradientBlackLgBottom"
            >
              <h1 className="w-full text-3xl font-bold line-clamp-1 sm:text-2xl sm:text-center sm:line-clamp-none">
                {movie.title}
              </h1>

              <div className="w-full flex gap-x-3 sm:px-4 sm:gap-x-2 sm:justify-center sm:items-center sm:flex-wrap sm:text-sm ">
                <p
                  className="hidden sm:block sm:border-2 sm:px-1 sm:rounded-md sm:bg-black/25"
                  style={{
                    borderColor:
                      movieStats.score < 50
                        ? "#ef4444"
                        : movieStats.score > 50 && movieStats.score < 70
                        ? "#fde047"
                        : "#22c55e",
                  }}
                >
                  {movieStats.score}%
                </p>
                {movie.genres?.map((genre) => {
                  return (
                    <Link
                      href={{
                        pathname: "/movies/genre/[id]",
                        query: { id: genre.id, name: genre.name },
                      }}
                      as={`/movies/genre/${genre.id}`}
                      key={genre.id}
                      className="italic hover:underline"
                    >
                      {genre.name}
                    </Link>
                  );
                })}
                <span>-</span>
                {movie.release_date.slice(0, 4)}
                <span>-</span>
                <p>
                  {movieStats.hour}h{movieStats.minutes}
                </p>
              </div>

              <div className="w-3/4 flex gap-2 items-end text-lg xl:text-base lg:w-full sm:hidden">
                <ProgressBar percentage={movieStats.score} />
                <p className="text-base italic mt-2 sm:text-sm">
                  (based on {movie.vote_count} votes)
                </p>
              </div>

              <p className="w-2/3 max-w-xl line-clamp-4 lg:text-base md:w-4/5 md:max-w-none md:text-sm sm:line-clamp-none">
                {movie.overview}
              </p>
              <Link
                href={`/movies/${movie.id}`}
                className="w-full max-w-xs py-4 mt-12 text-center bg-red-600 rounded-md uppercase font-bold shadow-md
                hover:bg-red-500 sm:py-3 sm:w-4/5 sm:my-6 sm:mx-auto"
              >
                See trailer
              </Link>
            </div>
          </div>
        )}
        <div className="w-full py-10 px-20 lg:px-6">
          <h2 className="text-2xl font-bold mb-3 tracking-wide uppercase">
            Cast
          </h2>
          <ActorList actors={credits} />
        </div>
        <div className="w-full py-10 px-20 lg:px-6">
          <h2 className="text-2xl font-bold mb-3 tracking-wide uppercase">
            Crew
          </h2>
          <CrewList crew={credits} />
        </div>
        <div className="w-full px-20  lg:px-6">
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
