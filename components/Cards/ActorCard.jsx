import Image from "next/image";
import defaultPoster from "../../public/assets/default_movie.webp"

const ActorCard = ({ actor }) => {
    return (
        <article className="w-3/4 p-4 rounded-xl shadow-lg dark:shadow-white/10">
            <div className="w-full h-full flex flex-col lg:gap-y-4">
                <div className="relative w-full h-[200px] overflow-hidden rounded-t-xl">
                    {actor.profile_path !== null ?
                        <Image src={`https://image.tmdb.org/t/p/h632/${actor.profile_path}`} layout="fill" sizes="(min-width: 75em) 33vw, (min-width: 48em) 50vw, 100vw" objectFit="cover" objectPosition="0% 0%" priority alt={actor.name} />
                        :
                        <Image src={defaultPoster} layout="fill" sizes="(min-width: 75em) 33vw, (min-width: 48em) 50vw, 100vw" objectFit="contain" priority alt={actor.name} />
                    }
                </div>
                <div className="w-full mt-2">
                    <h3 className={'w-full font-bold text-lg line-clamp-2 text-center dark:text-gray-200 md:text-lg sm:text-lg'}>{actor.character}</h3>
                    <h4 className={'w-full text-base line-clamp-2 text-center dark:text-gray-300 md:text-lg sm:text-lg'}>{actor.name}</h4>
                </div>
            </div>
        </article>
    );
}

export default ActorCard;
