import { MovieCredits } from "@/types/movies";
import { UseQueryResult } from "@tanstack/react-query";
import CrewCard from "../Cards/CrewCard";
import HorizontalScrollingList from "./HorizontalScrollingList";
import { ListType } from "@/types/components";
import CardSkeleton from "../Loaders/CardSkeleton";

const CrewList = ({ crew }: { crew: UseQueryResult<MovieCredits> }) => {
  return (
    <HorizontalScrollingList scroll={650} type={ListType.Image}>
      {crew.isLoading ? (
        Array(10)
          .fill(1)
          .map((x, i) => (
            <li key={i}>
              <CardSkeleton />
            </li>
          ))
      ) : crew.isError ? (
        <p>Sorry an error has occured</p>
      ) : (
        <>
          {crew.data?.crew.slice(0, 10).map((crew) => (
            <li key={crew.id}>
              <CrewCard crew={crew} />
            </li>
          ))}
        </>
      )}
    </HorizontalScrollingList>
  );
};

export default CrewList;
