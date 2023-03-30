import { VideoProps } from "@/types/movies";

export const getMovieVideoInResults = (array: VideoProps[]): VideoProps | undefined => {
  const movieVideo = array.find(
    (video) =>
      (video.name === "Official Trailer" || video.name === "Official Teaser") &&
      video.official
  );
  if (!movieVideo) {
    return;
  }
  return movieVideo;
};
