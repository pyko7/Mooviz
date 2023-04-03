import { ListType } from "@/types/components";
import { MoviesList } from "@/types/movies";
import MovieCard from "../Cards/MovieCard";
import HorizontalScrollingList from "./HorizontalScrollingList";

const MoviesListByGenre = ({ movies }: MoviesList) => {
  return (
    <HorizontalScrollingList scroll={650} type={ListType.Image}>
      {movies?.map((movie) => (
        <li
          className="min-w-[250px] pt-6 pb-10 xl:min-w-[200px] lg:min-w-[175px] md:min-w-[150px]"
          key={movie.id}
        >
          <MovieCard movie={movie} />
        </li>
      ))}
    </HorizontalScrollingList>
  );
};

export default MoviesListByGenre;
