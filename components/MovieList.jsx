import { ChevronRightIcon } from "@heroicons/react/solid";
import LoadingMovieCard from "./Loaders/LoadingMovieCard";
import LoadingSpinner from "./Loaders/LoadingSpinner";
import MovieCard from "./MovieCard";

const MovieList = ({ genre, movies }) => {
    return (
        <div className="w-full flex flex-col gap-y-6">
            <div className="w-full flex justify-between items-center uppercase">
                <h2 className="text-xl tracking-wide font-bold">
                    {genre === null || genre === undefined
                        ? "Popular right now"
                        : `${genre}'s most popular`}
                </h2>
                <div className="w-fit flex items-center gap-x-1 font-medium hover:underline">
                    <p>See all</p>
                    <ChevronRightIcon className="w-5 h-5" />
                </div>
            </div>
            <div className="w-full flex justify-evenly gap-x-8 xl:flex-wrap xl:gap-8 lg:justify-around md:flex-col">
                {movies.isLoading ? (
                    <LoadingMovieCard />
                ) : movies.isError ? (
                    <p className="text-center italic">
                        Sorry, an error has occured. Unfortunately, this content
                        isn&apos;t available.
                    </p>
                ) : (
                    <MovieCard movies={movies.data} />
                )}
            </div>
        </div>
    );
}

export default MovieList;