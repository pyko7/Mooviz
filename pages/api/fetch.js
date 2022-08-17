export const getWeeklyPopularMovies = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }
  return await res.json();
};

// function gets the differents genres
export const getGenresList = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }
  return await res.json();
};

export const getMoviesByGenre = async (genreId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`
  );
  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }
  return await res.json();
};
