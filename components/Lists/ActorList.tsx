import ActorCard from "../Cards/ActorCard";
import { MovieCredits } from "@/types/movies";
import { UseQueryResult } from "@tanstack/react-query";
import HorizontalScrollingList from "./HorizontalScrollingList";
import { ListType } from "@/types/components";
import CardSkeleton from "../Loaders/CardSkeleton";

const ActorList = ({ actors }: { actors: UseQueryResult<MovieCredits> }) => {
  return (
    <HorizontalScrollingList scroll={650} type={ListType.Image}>
      {actors.isLoading ? (
        Array(10)
          .fill(1)
          .map((x, i) => (
            <li key={i}>
              <CardSkeleton />
            </li>
          ))
      ) : actors.isError ? (
        <p>Sorry an error has occured</p>
      ) : (
        <>
          {actors.data?.cast.slice(0, 10).map((actor) => (
            <li key={actor.id}>
              <ActorCard actor={actor} />
            </li>
          ))}
        </>
      )}
    </HorizontalScrollingList>
  );
};

export default ActorList;
