import Carousel from "../components/Carousel";
import ProvidersList from "@/components/Lists/ProvidersList";
import MoviesListByGenre from "@/components/Lists/MoviesListByGenre";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import CarouselSkeleton from "@/components/Loaders/CarouselSkeleton";
import ListByGenreSkeleton from "@/components/Loaders/ListByGenreSkeleton";
import { useGenreContext } from "@/context/MoviesGenreContext";
import { useRouter } from "next/router";
import { getMoviesByGenre } from "@/utils/api/getMoviesByGenre";
import { useProvidersContext } from "@/context/ProdiversContext";
import { useEffect } from "react";
import ErrorMessage from "@/components/Errors/ErrorMessage";

export default function Home() {
  const {
    genresList,
    popularMoviesByGenre,
    popularMovies,
    getGenreId,
    getPopularMovies,
    setMoviesList,
    setActiveTabIndex,
  } = useGenreContext();
  const { setProvider, setPopularMoviesByGenre: setMoviesByProvider } =
    useProvidersContext();
  const { push } = useRouter();

  const handleClick = async (genreName: string) => {
    const genreId = getGenreId(genreName);
    if (!genreId) {
      getPopularMovies();
    } else {
      const movies = await getMoviesByGenre(genreId);
      setMoviesList(movies.results);
      setActiveTabIndex(genreId);
    }
    return push("/movies");
  };

  useEffect(() => {
    setProvider("");
    setMoviesByProvider([]);
  }, [setProvider, setMoviesByProvider]);

  return (
    <>
      <section className="w-full">
        {popularMovies.isLoading ? (
          <CarouselSkeleton />
        ) : popularMovies.isError ? (
          <div className="mt-24 py-10">
            <ErrorMessage />
          </div>
        ) : (
          <Carousel movies={popularMovies.data.results} />
        )}
      </section>

      <section className="w-full py-6 px-4">
        <h2 className="text-2xl uppercase font-bold xl:text-xl sm:text-lg">
          Plateformes
        </h2>
        <ProvidersList />

        {genresList.isLoading ? <ListByGenreSkeleton /> : null}
        {genresList.isError ? (
          <div className="py-10">
            <ErrorMessage />
          </div>
        ) : null}
        {popularMoviesByGenre?.map((movies) => (
          <div className="w-full" key={movies.genre}>
            <div className="w-full pr-2 flex justify-between uppercase sm:mt-10">
              <h2 className="text-2xl font-bold xl:text-xl sm:text-lg">
                {movies.genre}
              </h2>
              <button
                type="button"
                role="link"
                className="w-fit flex items-center gap-x-1 font-medium uppercase hover:underline sm:text-lg"
                onClick={() => handleClick(movies.genre)}
              >
                Voir plus
                <ChevronRightIcon aria-hidden="true" className="w-5 h-5" />
              </button>
            </div>
            <MoviesListByGenre movies={movies.movies} />
          </div>
        ))}
      </section>
    </>
  );
}
