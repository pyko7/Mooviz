import { ChildrenProps, GenreContext } from "@/types/context";
import { Movie, PopularMoviesByGenre } from "@/types/movies";
import { getGenresList } from "@/utils/api/getGenresList";
import { getMoviesByGenre } from "@/utils/api/getMoviesByGenre";
import { getWeeklyPopularMovies } from "@/utils/api/getWeeklyPopularMovies";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, createContext, useState } from "react";

const GenreContext = createContext({} as GenreContext);

export const useGenreContext = () => {
  return useContext(GenreContext);
};

const GenreProvider = ({ children }: ChildrenProps) => {
  const [genreId, setGenreId] = useState(0);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [moviesList, setMoviesList] = useState<Movie[]>([]);

  const [popularMoviesByGenre, setPopularMoviesByGenre] = useState<
    PopularMoviesByGenre[]
  >([]);

  const genresList = useQuery(["genres"], getGenresList, {
    staleTime: 30 * (60 * 1000), // 30 mins
    cacheTime: 45 * (60 * 1000), // 45 mins
  });

  const popularMovies = useQuery(["movies"], getWeeklyPopularMovies, {
    staleTime: 30 * (60 * 1000), // 30 mins
    cacheTime: 45 * (60 * 1000), // 45 mins
  });

  const getGenreId = (name: string) => {
    const genre = genresList.data?.genres.find((genre) => genre.name === name);
    return genre?.id;
  };

  const getPopularMovies = () => {
    if (typeof popularMovies.data !== "undefined") {
      setMoviesList(popularMovies.data.results);
    }
    return;
  };

  const getMoviesListByGenre = async (genreId: number) => {
    if (genreId === 0) {
      return getPopularMovies();
    }
    const movies = await getMoviesByGenre(genreId);
    setMoviesList(movies.results);
  };

  useEffect(() => {
    getMoviesListByGenre(genreId);
  }, [genreId]);

  useEffect(() => {
    const getPopularMoviesByGenre = async () => {
      if (typeof genresList.data === "undefined") {
        return;
      }
      for (const genre of genresList.data.genres) {
        const moviesByGenre = await getMoviesByGenre(genre.id);

        setPopularMoviesByGenre((popularMoviesByGenre) => [
          ...popularMoviesByGenre,
          {
            genre: genre.name,
            movies: moviesByGenre.results,
          },
        ]);
      }
    };
    getPopularMoviesByGenre();
  }, [genresList.data]);

  return (
    <GenreContext.Provider
      value={{
        activeTabIndex,
        setActiveTabIndex,
        genresList,
        popularMovies,
        popularMoviesByGenre,
        moviesList,
        setMoviesList,
        getPopularMovies,
        getMoviesListByGenre,
        getGenreId,
      }}
    >
      {children}
    </GenreContext.Provider>
  );
};

export default GenreProvider;
