export const getMoviesBySearch = async (keyword: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=fr&query=${keyword}&page=1&include_adult=false`
  );
  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }
  return await res.json();
};
