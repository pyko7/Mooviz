import { MovieCredits } from "@/types/movies";
import { UseQueryResult } from "@tanstack/react-query";
import CrewCard from "../Cards/CrewCard";
import HorizontalScrollingList from "./HorizontalScrollingList";
import { ListType } from "@/types/components";
import CardSkeleton from "../Loaders/CardSkeleton";
import ListSkeleton from "../Loaders/ListSkeleton";

const CrewList = ({ crew }: { crew: UseQueryResult<MovieCredits> }) => {
  return (
    <HorizontalScrollingList scroll={650} type={ListType.Image}>
      {crew.isLoading ? (
        <ListSkeleton length={10}>
          <CardSkeleton />
        </ListSkeleton>
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
