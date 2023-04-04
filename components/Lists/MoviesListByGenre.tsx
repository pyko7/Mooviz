import { ListType } from "@/types/components";
import { MoviesList } from "@/types/movies";
import MovieCard from "../Cards/MovieCard";
import HorizontalScrollingList from "./HorizontalScrollingList";

const MoviesListByGenre = ({ movies }: MoviesList) => {
  return (
    <HorizontalScrollingList scroll={650} type={ListType.Image}>
      <ul className="w-full flex gap-x-5 " role="list">
        {movies?.map((movie) => (
          <li
            className="min-w-[250px] pt-6 pb-10 xl:min-w-[200px] lg:min-w-[175px] md:min-w-[150px]"
            role="listitem"
            key={movie.id}
          >
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </HorizontalScrollingList>
  );
};

export default MoviesListByGenre;
