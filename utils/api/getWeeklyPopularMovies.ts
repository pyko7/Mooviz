import { MoviesResults } from "@/types/movies";

export const getWeeklyPopularMovies = async (): Promise<MoviesResults> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }
  return await res.json();
};
