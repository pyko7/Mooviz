import { useScrollX } from "@/hooks/useScrollX";
import { GenresListMoviesPage } from "@/types/movies";
import { getMoviesByGenre } from "@/utils/api/getMoviesByGenre";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const GenresList = ({
  genres,
  setMoviesList,
  handlePopularMovies,
}: GenresListMoviesPage) => {
  const [active, setActive] = useState(0);
  const {
    ref,
    scrollX,
    scrollEnd,
    handleScroll,
    handleClick: handleScrollClick,
  } = useScrollX();

  const handleClick = async (genreId: number) => {
    if (genreId === 0) {
      handlePopularMovies();
      setActive(0);
      return;
    }
    const movies = await getMoviesByGenre(genreId);
    setMoviesList(movies.results);
    setActive(genreId);
  };

  return (
    <div className="relative w-full h-full mt-24">
      {scrollX !== 0 ? (
        <button
          name="Scroll through providers to left"
          aria-label="Scroll to left"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-20 flex justify-center items-center z-10 bg-black/50 cursor-pointer opacity-20 hover:opacity-100 xl:h-14 lg:opacity-75 md:hidden"
          onClick={() => handleScrollClick(-300)}
        >
          <ChevronLeftIcon className="w-6 h-6" aria-hidden="true" />
        </button>
      ) : null}
      <ul
        ref={ref}
        role="listitem"
        className="tabs__scrollbar--hide w-full flex items-center gap-6 overflow-x-auto scroll-smooth md:py-4"
        onScroll={handleScroll}
      >
        <li>
          <button
            type="button"
            className={`${
              active === 0 ? "font-bold  text-white" : "text-neutral-400"
            }  whitespace-nowrap  uppercase`}
            onClick={() => handleClick(0)}
          >
            Popular movies
          </button>
        </li>
        {genres.map((genre: any) => (
          <li key={genre.id}>
            <button
              type="button"
              className={`${
                active === genre.id
                  ? "font-bold text-white"
                  : "text-neutral-400"
              }  whitespace-nowrap uppercase`}
              onClick={() => handleClick(genre.id)}
            >
              {genre.name}
            </button>
          </li>
        ))}
      </ul>
      {!scrollEnd ? (
        <button
          name="Scroll through providers to right"
          aria-label="Scroll to right"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-20 flex justify-center items-center z-10 bg-black/50 cursor-pointer opacity-20 hover:opacity-100 xl:h-14 lg:opacity-75 md:hidden"
          onClick={() => handleScrollClick(300)}
        >
          <ChevronRightIcon className="w-6 h-6" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
};

export default GenresList;
