import { MovieCredits } from "@/types/movies";
import { UseQueryResult } from "@tanstack/react-query";
import CrewCard from "../Cards/CrewCard";
import HorizontalScrollingList from "./HorizontalScrollingList";
import { ListType } from "@/types/components";
import CardSkeleton from "../Loaders/CardSkeleton";
import ListSkeleton from "../Loaders/ListSkeleton";
import ErrorMessage from "../Errors/ErrorMessage";

const CrewList = ({ crew }: { crew: UseQueryResult<MovieCredits> }) => {
  return (
    <HorizontalScrollingList scroll={650} type={ListType.Image}>
      {crew.isLoading ? (
        <ListSkeleton length={10}>
          <CardSkeleton />
        </ListSkeleton>
      ) : crew.isError ? (
        <div className="w-full m-auto mt-10 py-10">
          <ErrorMessage />
        </div>
      ) : (
        <ul className="w-full flex gap-x-5" role="list">
          {crew.data?.crew.slice(0, 10).map((crew) => (
            <li role="listitem" key={crew.id}>
              <CrewCard crew={crew} />
            </li>
          ))}
        </ul>
      )}
    </HorizontalScrollingList>
  );
};

export default CrewList;
