export interface MoviesGenre {
  id: number;
  name: string;
}

export interface CarouselMovie {
  backdrop_path: string;
  title: string;
  overview: string;
  id: number;
}

export interface CarouselMoviesList {
  movies: CarouselMovie[];
}
