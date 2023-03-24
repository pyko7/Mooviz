export const getGenresList = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
  );
  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }
  return await res.json();
};
