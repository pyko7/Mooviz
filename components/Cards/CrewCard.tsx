import Image from "next/image";
import defaultPoster from "@/public/assets/default_movie.webp";
import { CrewMember } from "@/types/movies";

const CrewCard = ({ crew }: { crew: CrewMember }) => {
  return (
    <article className="max-w-[150px] rounded-md flex flex-col gap-3 ">
      {crew.profile_path !== null ? (
        <Image
          src={`https://image.tmdb.org/t/p/h632/${crew.profile_path}`}
          width={150}
          height={150}
          className="object-contain rounded-md"
          alt={crew.name}
        />
      ) : (
        <Image
          src={defaultPoster}
          width={250}
          height={250}
          className="object-contain rounded-md"
          alt={crew.name}
        />
      )}

      <div className="w-full">
        <p className="font-bold text-lg md:text-lg sm:text-lg">{crew.name}</p>
        <p className="text-base text-neutral-400 md:text-lg sm:text-lg">
          {crew.department}
        </p>
      </div>
    </article>
  );
};

export default CrewCard;
