import Skeleton from "./Skeleton";

const CarouselSkeleton = () => {
  return (
    <div className="relative">
      <Skeleton width={"100%"} height={900} />

      <div className="absolute top-3/4 -translate-y-3/4 left-0 w-full px-20 flex flex-col gap-6 xl:px-10 sm:top-[85%] sm:left-1/2 sm:-translate-x-1/2 sm:px-4">
        <div className="w-full max-w-lg">
          <Skeleton width={"100%"} height={32} light />
        </div>
        <div className="w-2/3 max-w-xl md:w-4/5 md:max-w-none sm:hidden">
          <Skeleton width={"100%"} height={32} light />
        </div>
        <div className="w-full max-w-xs mt-12 text-center sm:w-4/5 sm:mt-4 sm:mx-auto">
          <Skeleton width={"100%"} height={32} light />
        </div>
      </div>
    </div>
  );
};

export default CarouselSkeleton;
