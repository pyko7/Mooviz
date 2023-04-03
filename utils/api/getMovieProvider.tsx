import { MovieProviderResults } from "@/types/movies";

export const getMovieProvider = async (
  movieId: number
): Promise<MovieProviderResults> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/3/movie/${movieId}/watch/providers?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }
  return await res.json();
};
