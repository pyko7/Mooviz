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
    >
      {movie.poster_path !== null ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          priority
          width={250}
          height={250}
          className="object-contain"
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
