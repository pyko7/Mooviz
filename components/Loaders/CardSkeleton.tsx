import Skeleton from "./Skeleton";

const CardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="w-[150px] h-48 rounded-md flex flex-col justify-end bg-neutral-700 lg:w-32 md:w-28"></div>
      <div className="mt-3 flex flex-col gap-2">
        <Skeleton width={"100%"} height={16} />
        <Skeleton width={"90%"} height={12} />
      </div>
    </div>
  );
};

export default CardSkeleton;
