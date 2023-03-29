import Image from "next/image";
import Link from "next/link";
import defaultPoster from "@/public/assets/default_movie.webp";
import { MovieCard } from "@/types/movies";

const MovieCard = ({ movie }: MovieCard) => {
  return (
    <Link
      href={{
        pathname: "/movies/[id]",
        query: { id: movie.id },
      }}
      as={`/movies/${movie.id}`}
      aria-label={movie.title}
      className="rounded-md"
      style={{
        boxShadow:
          "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(0, 0, 0, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
      }}
    >
      {movie.poster_path !== null ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          priority
          width={250}
          height={250}
          className="object-contain rounded-md"
          alt={movie.title}
        />
      ) : (
        <Image
          src={defaultPoster}
          priority
          width={250}
          height={250}
          className="object-contain"
          alt={movie.title}
        />
      )}
    </Link>
  );
};

export default MovieCard;
