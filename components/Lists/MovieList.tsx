import MovieCard from "../Cards/MovieCard";
import { MoviesList } from "@/types/movies";

const MovieList = ({ movies }: MoviesList) => {
  return (
    <div className="w-full flex flex-wrap gap-6 xl:justify-center lg:justify-start lg:gap-3 lg:gap-y-4 md:justify-center">
      {movies.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  );
};

export default MovieList;
