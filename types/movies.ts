import { UseQueryResult } from "@tanstack/react-query";

export interface MovieGenre {
  id: number;
  name: string;
}

export interface MoviesResults {
  page: number;
  results: HomepageMovies[];
  total_pages: number;
  total_results: number;
}

export interface GenresList {
  genres: MovieGenre[];
}

export interface GenresListMoviesPage {
  genres: MovieGenre[];
  setMoviesList: (moviesList: HomepageMovies[]) => void;
  handlePopularMovies: () => void;
}

export interface PopularMoviesByGenre {
  genre: string;
  movies: HomepageMovies[];
}

export interface MoviesProvider {
  id: number;
  provider_name: string;
  logo_path: string;
  main_color: string;
  lighten_color: string;
}

export interface HomepageMovies {
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  id: number;
}

export interface HomepageMoviesList {
  movies: HomepageMovies[];
}

export interface MovieCard {
  movie: HomepageMovies;
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

export interface MoviesDetails extends HomepageMovies {
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
