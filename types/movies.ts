export interface MoviesGenre {
  id: number;
  name: string;
}

export interface PopularMoviesByGenre {
  genre: string;
  movies: CarouselMovie[];
}

export interface MoviesProvider {
  id: number;
  provider_name: string;
  logo_path: string;
  main_color: string;
  lighten_color: string;
}

export interface CarouselMovie {
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  id: number;
}

export interface CarouselMoviesList {
  movies: CarouselMovie[];
}

export interface MovieCard {
  movie: CarouselMovie;
}
