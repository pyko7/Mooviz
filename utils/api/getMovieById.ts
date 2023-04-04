import { MoviesDetails } from "@/types/movies";

export const getMovieById = async (
  movieId: number
): Promise<MoviesDetails> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&video=true&language=fr`
  );
  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }
  return await res.json();
};
