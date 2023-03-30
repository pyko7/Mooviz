import { ListType } from "@/types/components";
import { GenresListMoviesPage } from "@/types/movies";
import { getMoviesByGenre } from "@/utils/api/getMoviesByGenre";
import { useState } from "react";
import HorizontalScrollingList from "./HorizontalScrollingList";

const GenresList = ({
  genres,
  setMoviesList,
  handlePopularMovies,
}: GenresListMoviesPage) => {
  const [active, setActive] = useState(0);

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
    <div className="mt-24">
      <HorizontalScrollingList scroll={300} type={ListType.Text}>
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
      </HorizontalScrollingList>
    </div>
  );
};

export default GenresList;
