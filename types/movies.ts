export interface MovieGenre {
  id: number;
  name: string;
}

export interface GenresList {
  genres: MovieGenre[];
}

export interface GenresListMoviesPage {
  genres: MovieGenre[];
  setMoviesList: (moviesList: []) => void;
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
