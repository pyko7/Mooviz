import Image from "next/image";
import defaultPoster from "@/public/assets/default_movie.webp";
import { Actor } from "@/types/movies";

const ActorCard = ({ actor }: { actor: Actor }) => {
  return (
    <article className="w-[150px] rounded-md flex flex-col gap-3 lg:w-32 md:w-28">
      {actor.profile_path !== null ? (
        <Image
          src={`https://image.tmdb.org/t/p/h632/${actor.profile_path}`}
          width={150}
          height={150}
          className="object-contain rounded-md"
          alt={actor.name}
        />
      ) : (
        <Image
          src={defaultPoster}
          width={250}
          height={250}
          className="object-contain rounded-md"
          alt={actor.name}
        />
      )}

      <div className="w-full">
        <p className="font-bold text-lg md:text-lg sm:text-lg">
          {actor.character}
        </p>
        <p className="text-base text-neutral-400 md:text-lg sm:text-lg">
          {actor.name}
        </p>
      </div>
    </article>
  );
};

export default ActorCard;
