import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MovieList from "@/components/Lists/MovieList";
import ProgressBar from "@/components/ProgressBar";
import ActorList from "@/components/Lists/ActorList";
import CrewList from "@/components/Lists/CrewList";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { useGetMovieById } from "@/hooks/useGetMovieById";
import Skeleton from "@/components/Loaders/Skeleton";
import MoviePageSkeleton from "@/components/Loaders/MoviePageSkeleton";
import ListSkeleton from "@/components/Loaders/ListSkeleton";
import { ProviderFlatrate } from "@/types/movies";
import ErrorMessage from "@/components/Errors/ErrorMessage";

const MovieById = () => {
  const [mobile, setMobile] = useState(false);
  const [providers, setProviders] = useState<ProviderFlatrate[]>([]);
  const { query } = useRouter();
  const movieId = parseInt(query.id as string);

  const {
    details,
    movieStats,
    credits,
    videos,
    similarMovies,
    movieProviders,
  } = useGetMovieById(movieId);

  useEffect(() => {
    const getWindowSize = () => {
      if (window.innerWidth < 576) {
        setMobile(true);
      }
    };
    getWindowSize();
  }, []);

  useEffect(() => {
    if (
      typeof movieProviders.data !== "undefined" &&
      typeof movieProviders.data.results.FR !== "undefined"
    ) {
      setProviders(movieProviders.data.results.FR.flatrate);
    }
    return;
  }, [movieProviders.data]);

  return (
    <>
      <Head>
        <title>{details.data?.title}</title>
        <meta name="description" content={details.data?.overview} />
        {/* Open Graph */}
        <meta property="og:description" content={details.data?.overview} />
        <meta property="og:title" content={details.data?.title} />
      </Head>

      <section className="w-full">
        {details.isLoading ? (
          <MoviePageSkeleton />
        ) : details.isError ? (
          <div className="mt-24 py-10">
            <ErrorMessage />
          </div>
        ) : (
          <div className="relative inline-block w-full">
            <div className="poster_container relative w-full h-[900px] sm:h-auto sm:min-h-screen">
              <Image
                src={
                  !mobile
                    ? `https://image.tmdb.org/t/p/original/${details.data.backdrop_path}`
                    : `https://image.tmdb.org/t/p/original/${details.data.poster_path}`
                }
                fill
                className="object-cover"
                priority
                alt={details.data.title}
              />
            </div>

            <div
              className="absolute top-1/2 -translate-y-1/2 left-0 w-full px-20 flex flex-col gap-6 z-10 xl:px-10
                sm:top-3/4 sm:left-1/2 sm:-translate-x-1/2 sm:items-center sm:px-4 sm:gap-3 sm:bg-gradientBlackLgBottom"
            >
              <h1 className="w-full text-3xl font-bold line-clamp-1 sm:text-2xl sm:text-center sm:line-clamp-none">
                {details.data.title}
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
                {details.data.genres?.map((genre) => {
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
                {details.data.release_date.slice(0, 4)}
                <span>-</span>
                <p>
                  {movieStats.hour}h{movieStats.minutes}
                </p>
              </div>

              <div className="w-3/4 flex gap-2 items-end text-lg xl:text-base lg:w-full sm:hidden">
                <ProgressBar percentage={movieStats.score} />
                <p className="text-base italic mt-2 sm:text-sm">
                  (based on {details.data.vote_count} votes)
                </p>
              </div>

              <p className="w-2/3 max-w-xl line-clamp-4 lg:text-base md:w-4/5 md:max-w-none md:text-sm sm:line-clamp-none">
                {details.data.overview}
              </p>
              {providers?.length === 0 ? null : (
                <div className="w-2/3 max-w-x flex gap-2 md:w-4/5 md:max-w-none">
                  {providers?.map((provider) => (
                    <Image
                      aria-label={`Available on ${provider.provider_name}`}
                      width={50}
                      height={50}
                      src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                      alt={provider.provider_name}
                      className="sm:w-10 sm:h-10"
                      key={provider.provider_id}
                    />
                  ))}
                </div>
              )}

              {!videos ? null : (
                <a
                  href={`https://www.${videos.site}.com/watch?v=${videos.key}`}
                  className="w-full max-w-xs py-4 mt-12 flex justify-center items-center gap-2 text-center bg-red-600 rounded-md uppercase font-bold shadow-md
              hover:bg-red-500 sm:py-3 sm:w-4/5 sm:my-6 sm:mx-auto"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener"
                  aria-label="Ouvre un lien externe vers la bande annonce"
                >
                  Voir la bande-annonce
                  <ArrowTopRightOnSquareIcon
                    className="w-5 h-5"
                    aria-hidden="true"
                  />
                </a>
              )}
            </div>
          </div>
        )}
        <div className="w-full py-10 px-20 lg:px-6 sm:pt-28 sm:pb-0">
          <h2 className="text-2xl font-bold mb-3 tracking-wide uppercase">
            Cast
          </h2>
          <ActorList actors={credits} />
        </div>
        <div className="w-full py-10 px-20 lg:px-6 sm:py-4">
          <h2 className="text-2xl font-bold mb-3 tracking-wide uppercase">
            Crew
          </h2>
          <CrewList crew={credits} />
        </div>
        <div className="w-full px-20  lg:px-6">
          {similarMovies.isLoading ? (
            <div className="w-full pt-24">
              <ListSkeleton length={20} wrap>
                <Skeleton height={250} width={250} />
              </ListSkeleton>
            </div>
          ) : similarMovies.isError ? (
            <div className="w-full m-auto mt-10 py-10">
              <ErrorMessage />
            </div>
          ) : (
            <>
              <h2 className="mb-8 text-xl tracking-wide uppercase font-bold">
                Films similaires
              </h2>
              <MovieList movies={similarMovies.data.results.slice(0, 18)} />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default MovieById;
