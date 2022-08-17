import Carousel from "../components/Carousel";
import { useQuery } from "@tanstack/react-query";
import ComponentsLoader from "../components/Loaders/LoadingSpinner";
import {
  getWeeklyPopularMovies,
  getGenresList,
  getMoviesByGenre,
} from "./api/fetch";
import { useState } from "react";
import MovieList from "../components/MovieList";

export default function Home() {
  const [genreId, setGenreId] = useState("");
  const [genreName, setGenreName] = useState(null);
  // console.log(genreName);

  const carouselQuery = useQuery(["carousel"], getWeeklyPopularMovies);
  const genresQuery = useQuery(["genres"], getGenresList);
  const popularMoviesByGenre = useQuery(["movies", genreId], () =>
    getMoviesByGenre(genreId)
  );

  const handleGenre = (genre) => {
    console.log(genre);
    if (genre.value === null) {
      setGenreId("");
      setGenreName(null);
    } else {
      setGenreId(genre.id);
      setGenreName(genre.name);
    }
    popularMoviesByGenre.refetch();
  };

  return (
    <main className="w-full flex flex-col items-center bg-gray-200 shadow-[inset_0_25px_50px_-12px_rgba(0,0,0,0.25)]">
      <section className="w-full max-w-[1920px] min-h-screen py-10 overflow-x-hidden xl:w-11/12 md:w-full">
        {carouselQuery.isLoading ? (
          <ComponentsLoader />
        ) : carouselQuery.isError ? (
          <p className="text-center italic">
            Sorry, an error has occured. Unfortunately, this content isn&apos;t
            available.
          </p>
        ) : (
          <Carousel movies={carouselQuery.data} />
        )}
      </section>
      <section className="w-full max-w-[1920px] py-10 px-14 flex flex-col gap-y-10 overflow-x-hidden  xl:w-11/12 md:w-full">
        <div>
          <select
            name="genres"
            id="genres"
            className="p-2 rounded-[4px] font-medium bg-white shadow-md"
          >
            {genresQuery.isLoading || genresQuery.isFetching ? (
              <option value="Loading">Loading...</option>
            ) : genresQuery.isError ? null : (
              <>
                <option value={null} onClick={(genre) => handleGenre(genre)}>
                  Genres
                </option>
                {genresQuery.data.genres?.map((genre) => {
                  return (
                    <option
                      value={genre.name}
                      key={genre.id}
                      onClick={() => handleGenre(genre)}
                    >
                      {genre.name}
                    </option>
                  );
                })}
              </>
            )}
          </select>
        </div>
        <MovieList genre={genreName} movies={popularMoviesByGenre} />
      </section>
    </main>
  );
}
