import { UseQueryResult } from "@tanstack/react-query";

export interface MovieGenre {
  id: number;
  name: string;
}

export interface MoviesResults {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface GenresList {
  genres: MovieGenre[];
}

export interface PopularMoviesByGenre {
  genre: string;
  movies: Movie[];
}

export interface MoviesProvider {
  id: number;
  provider_name: string;
  main_color: string;
  lighten_color: string;
  query_name: string;
}

export interface Movie {
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  id: number;
}

export interface MoviesList {
  movies: Movie[];
  handleClose?: () => void;
}

export interface MovieCard {
  movie: Movie;
  handleClose?: () => void;
}

export interface MovieById {
  details: UseQueryResult<MoviesDetails>;
  credits: UseQueryResult<MovieCredits>;
  movieStats: MovieStats;
  videos: VideoProps | undefined;
  similarMovies: UseQueryResult<MoviesResults>;
}

export interface MovieStats {
  score: number;
  hour: number;
  minutes: number;
}

export interface MoviesDetails extends Movie {
  genres: MovieGenre[];
  vote_average: number;
  vote_count: number;
  runtime: number;
  release_date: string;
}

export interface Actor {
  id: number;
  profile_path: string;
  name: string;
  character: string;
}

export interface CrewMember {
  id: number;
  profile_path: string;
  department: string;
  name: string;
}

export interface MovieCredits {
  cast: Actor[];
  crew: CrewMember[];
}

export interface VideoProps {
  id: string;
  key: string;
  name: string;
  official: boolean;
  site: string;
  type: string;
}

export interface VideosResults {
  id: number;
  results: VideoProps[];
}
