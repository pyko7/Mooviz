import { UseQueryResult } from "@tanstack/react-query";
import { ReactNode } from "react";
import {
  GenresList,
  Movie,
  MoviesResults,
  PopularMoviesByGenre,
} from "./movies";

export type ChildrenProps = { children?: ReactNode };

export interface GenreContext {
  activeTabIndex: number;
  setActiveTabIndex: (activeTabIndex: number) => void;
  moviesList: Movie[];
  setMoviesList: (moviesList: Movie[]) => void;
  genresList: UseQueryResult<GenresList>;
  popularMovies: UseQueryResult<MoviesResults>;
  popularMoviesByGenre: PopularMoviesByGenre[];
  getPopularMovies: () => void;
  getMoviesListByGenre: (genreId: number) => void;
  getGenreId: (name: string) => void | number;
}

export interface ProvidersContext {
  provider: string;
  setProvider: (provider: string) => void;
  popularMoviesByGenre: PopularMoviesByGenre[];
  setPopularMoviesByGenre: (
    popularMoviesByGenre: PopularMoviesByGenre[]
  ) => void;
}
