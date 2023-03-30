import ActorCard from "../Cards/ActorCard";
import { MovieCredits } from "@/types/movies";
import { UseQueryResult } from "@tanstack/react-query";
import { useScrollX } from "@/hooks/useScrollX";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const ActorList = ({ actors }: { actors: UseQueryResult<MovieCredits> }) => {
  const { scrollX, handleClick, ref, handleScroll, scrollEnd } = useScrollX();
  return (
    <div className="relative w-full h-full">
      {scrollX !== 0 ? (
        <button
          name="Scroll through providers to left"
          aria-label="Scroll to left"
          className="absolute left-0 top-0 w-20 h-full  flex justify-center items-center z-10 bg-black/50 cursor-pointer opacity-20 hover:opacity-100 lg:opacity-75 md:hidden"
          onClick={() => handleClick(-650)}
        >
          <ChevronLeftIcon className="w-6 h-6" aria-hidden="true" />
        </button>
      ) : null}
      <ul
        ref={ref}
        role="listitem"
        className="tabs__scrollbar--hide w-full flex gap-5 overflow-x-auto scroll-smooth md:py-4"
        onScroll={handleScroll}
      >
        {actors.data?.cast.slice(0, 10).map((actor) => (
          <li key={actor.id}>
            <ActorCard actor={actor} />
          </li>
        ))}
      </ul>
      {!scrollEnd ? (
        <button
          name="Scroll through providers to right"
          aria-label="Scroll to right"
          className="absolute right-0 top-0 w-20 h-full  flex justify-center items-center z-10 bg-black/50 cursor-pointer opacity-20 hover:opacity-100 lg:opacity-75 md:hidden"
          onClick={() => handleClick(650)}
        >
          <ChevronRightIcon className="w-6 h-6" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
};

export default ActorList;
