export const getMovieStats = (votes: number, runtime: number) => {
  const score = Math.trunc((votes / 10) * 100);
  const hour = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return { score, hour, minutes };
};
