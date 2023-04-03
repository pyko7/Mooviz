import Skeleton from "./Skeleton";

const MoviePageSkeleton = () => {
  return (
    <div className="relative animate-pulse">
      <Skeleton width={"100%"} height={900} />

      <div className="absolute top-3/4 -translate-y-3/4 left-0 w-full px-20 flex flex-col gap-6 xl:px-10 sm:top-[85%] sm:left-1/2 sm:-translate-x-1/2 sm:px-4">
        <div className="w-full max-w-lg">
          <Skeleton width={"100%"} height={40} light />
        </div>

        <div className="w-full flex gap-x-3 sm:px-4 sm:gap-x-2 sm:justify-center sm:items-center sm:flex-wrap">
          <Skeleton width={70} height={20} light />
          <Skeleton width={70} height={20} light />
          <span>-</span>
          <Skeleton width={45} height={20} light />
          <span>-</span>
          <Skeleton width={40} height={20} light />
        </div>

        <div className="w-3/4 flex gap-2 items-end lg:w-full sm:hidden">
          <Skeleton width={45} height={45} light circle />
          <Skeleton width={120} height={15} light />
        </div>
        <div className="w-2/3 max-w-xl md:w-4/5 md:max-w-none md:m-auto">
          <Skeleton width={"100%"} height={150} light />
        </div>
        <div className="w-full max-w-xs mt-12 text-center sm:w-4/5 sm:mt-4 sm:mx-auto">
          <Skeleton width={"100%"} height={60} light />
        </div>
      </div>
    </div>
  );
};

export default MoviePageSkeleton;
