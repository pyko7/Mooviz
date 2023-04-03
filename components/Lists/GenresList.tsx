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
        <li>
          <button
            type="button"
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
        {genres.map((genre: any) => (
          <li key={genre.id}>
            <button
              type="button"
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
      </HorizontalScrollingList>
    </div>
  );
};

export default GenresList;
