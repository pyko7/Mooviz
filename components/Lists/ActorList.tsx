import ActorCard from "../Cards/ActorCard";
import { MovieCredits } from "@/types/movies";
import { UseQueryResult } from "@tanstack/react-query";
import HorizontalScrollingList from "./HorizontalScrollingList";
import { ListType } from "@/types/components";
import ListSkeleton from "../Loaders/ListSkeleton";
import CardSkeleton from "../Loaders/CardSkeleton";
import ErrorMessage from "../Errors/ErrorMessage";

const ActorList = ({ actors }: { actors: UseQueryResult<MovieCredits> }) => {
  return (
    <HorizontalScrollingList scroll={650} type={ListType.Image}>
      {actors.isLoading ? (
        <ListSkeleton length={10}>
          <CardSkeleton />
        </ListSkeleton>
      ) : actors.isError ? (
        <div className="w-full m-auto mt-10 py-10">
          <ErrorMessage />
        </div>
      ) : (
        <ul className="w-full flex gap-x-5" role="list">
          {actors.data?.cast.slice(0, 10).map((actor) => (
            <li role="listitem" key={actor.id}>
              <ActorCard actor={actor} />
            </li>
          ))}
        </ul>
      )}
    </HorizontalScrollingList>
  );
};

export default ActorList;
