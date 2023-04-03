import { ChildrenProps, ProvidersContext } from "@/types/context";
import { PopularMoviesByGenre } from "@/types/movies";
import { getMoviesByGenreByProvider } from "@/utils/api/getMoviesByGenreByProvider";
import { useContext, useEffect, createContext, useState } from "react";
import { useGenreContext } from "./MoviesGenreContext";

const ProvidersContext = createContext({} as ProvidersContext);

export const useProvidersContext = () => {
  return useContext(ProvidersContext);
};

const MoviesProvidersProvider = ({ children }: ChildrenProps) => {
  const { genresList } = useGenreContext();
  const [provider, setProvider] = useState("");
  const [popularMoviesByGenre, setPopularMoviesByGenre] = useState<
    PopularMoviesByGenre[]
  >([]);

  useEffect(() => {
    const getPopularMoviesByGenre = async () => {
      if (typeof genresList.data === "undefined" || provider === "") {
        return;
      }
      for (const genre of genresList.data.genres) {
        const moviesByGenre = await getMoviesByGenreByProvider(
          provider,
          genre.id
        );

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
  }, [genresList.data, provider]);

  return (
    <ProvidersContext.Provider
      value={{
        provider,
        setProvider,
        popularMoviesByGenre,
        setPopularMoviesByGenre
      }}
    >
      {children}
    </ProvidersContext.Provider>
  );
};

export default MoviesProvidersProvider;
