import { MovieStats, VideoProps } from "@/types/movies";
import { getMovieById } from "@/utils/api/getMovieById";
import { getMovieCredits } from "@/utils/api/getMovieCredits";
import { getMovieVideo } from "@/utils/api/getMovieVideo";
import { getSimilarMovies } from "@/utils/api/getSimilarMovies";
import { getMovieStats } from "@/utils/getMovieStats";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useGetMovieById = (movieId: number) => {
  const [videos, setVideos] = useState<VideoProps>();
  const [movieStats, setMovieStats] = useState<MovieStats>({
    score: 0,
    hour: 0,
    minutes: 0,
  });
  const details = useQuery(["movie", movieId], () => getMovieById(movieId));
  const credits = useQuery(["credits", movieId], () =>
    getMovieCredits(movieId)
  );
  const similarMovies = useQuery(["movies", movieId], () =>
    getSimilarMovies(movieId)
  );

  const video = useQuery(["movieVideo", movieId], () => getMovieVideo(movieId));

  useEffect(() => {
    if (typeof video.data !== "undefined") {
      const movieVideo = video.data.results.find(
        (vid) =>
          (vid.name === "Official Trailer" || vid.name === "Official Teaser") &&
          vid.official
      );
      if (!movieVideo) {
        return;
      }
      return setVideos(movieVideo);
    }
  }, [video.data]);

  useEffect(() => {
    if (typeof details.data !== "undefined") {
      const { score, hour, minutes } = getMovieStats(
        details.data?.vote_average,
        details.data?.runtime
      );
      setMovieStats({ score, hour, minutes });
    }
  }, [details.data]);

  return {
    details,
    movieStats,
    credits,
    videos,
    similarMovies,
  };
};
