import { MoviesResults } from "@/types/movies";

export const getSimilarMovies = async (
  movieId: number
): Promise<MoviesResults> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/3/movie/${movieId}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=fr`
  );
  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }
  return await res.json();
};
