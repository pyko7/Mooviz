import LoadingSpinner from "./Loaders/LoadingSpinner";
import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
    return (
        <div className="w-full grid grid-cols-6 gap-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {movies.isLoading ? (
                <LoadingSpinner />
            ) : movies.isError ? (
                <p className="text-center italic">
                    Sorry, an error has occured. Unfortunately, this content
                    isn&apos;t available.
                </p>
            ) : (
                <>
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </>
            )}
        </div>

    );
}

export default MovieList;