import { MoviesResults } from "@/types/movies";

export const getMoviesByGenre = async (
  genreId: number
): Promise<MoviesResults> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=fr&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${genreId}`
  );
  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }
  return await res.json();
};
