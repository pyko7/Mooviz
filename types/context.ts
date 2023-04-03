import { UseQueryResult } from "@tanstack/react-query";
import { ReactNode } from "react";
import {
  GenresList,
  HomepageMovies,
  MoviesResults,
  PopularMoviesByGenre,
} from "./movies";

export type ChildrenProps = { children?: ReactNode };

export interface GenreContext {
  activeTabIndex: number;
  setActiveTabIndex: (activeTabIndex: number) => void;
  moviesList: HomepageMovies[];
  setMoviesList: (moviesList: HomepageMovies[]) => void;
  genresList: UseQueryResult<GenresList>;
  popularMovies: UseQueryResult<MoviesResults>;
  popularMoviesByGenre: PopularMoviesByGenre[];
  getPopularMovies: () => void;
  getMoviesListByGenre: (genreId: number) => void;
  getGenreId: (name: string) => void | number;
}
