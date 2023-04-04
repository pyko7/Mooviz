import { useGenreContext } from "@/context/MoviesGenreContext";
import { ListType } from "@/types/components";
import { GenresList } from "@/types/movies";
import HorizontalScrollingList from "./HorizontalScrollingList";

const GenresList = ({ genres }: GenresList) => {
  const { getMoviesListByGenre, activeTabIndex, setActiveTabIndex } =
    useGenreContext();

  const handleClick = (genreId: number) => {
    getMoviesListByGenre(genreId);
    return setActiveTabIndex(genreId);
  };

  return (
    <div className="mt-24">
      <HorizontalScrollingList scroll={300} type={ListType.Text}>
        <ul className="w-full flex gap-x-5 " role="list">
          <li role="listitem">
            <button
              type="button"
              aria-label="Films les plus populaires"
              className={`${
                activeTabIndex === 0
                  ? "font-bold  text-white"
                  : "text-neutral-400"
              }  whitespace-nowrap  uppercase`}
              onClick={() => handleClick(0)}
            >
              Popular movies
            </button>
          </li>
          {genres.map((genre) => (
            <li key={genre.id}>
              <button
                type="button"
                aria-label={`Films ${genre.name}`}
                className={`${
                  activeTabIndex === genre.id
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
      </HorizontalScrollingList>
    </div>
  );
};

export default GenresList;
