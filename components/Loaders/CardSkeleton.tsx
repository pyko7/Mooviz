const CardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="w-[150px] h-48 rounded-md flex flex-col justify-end bg-neutral-700 lg:w-32 md:w-28"></div>
      <div className="mt-3  flex flex-col gap-2">
        <div className="w-full h-4 bg-neutral-700 rounded"></div>
        <div className="w-10/12 h-3 bg-neutral-700 rounded"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
