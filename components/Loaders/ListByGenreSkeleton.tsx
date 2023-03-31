import ListSkeleton from "./ListSkeleton";
import PosterSkeleton from "./PosterSkeleton";
import Skeleton from "./Skeleton";

const ListByGenreSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="w-full pr-2 mb-10 flex justify-between sm:mt-10 sm:mb-4">
        <Skeleton width={144} height={32} />
        <Skeleton width={80} height={32} />
      </div>
      <ListSkeleton length={10}>
        <PosterSkeleton />
      </ListSkeleton>
    </div>
  );
};

export default ListByGenreSkeleton;
