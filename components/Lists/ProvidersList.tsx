import { providersList } from "@/utils/providersList";
import ProviderCard from "@/components/Cards/ProviderCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useScrollX } from "@/hooks/useScrollX";

const ProvidersList = () => {
  const { ref, scrollX, scrollEnd, handleClick, handleScroll } = useScrollX();

  return (
    <div className="relative w-full h-full">
      {scrollX !== 0 ? (
        <button
          name="Scroll through providers to left"
          aria-label="Scroll to left"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-full max-h-[216px] flex justify-center items-center z-10 bg-black/50 cursor-pointer opacity-20 hover:opacity-100 xl:max-h-[162px] lg:max-h-[136px] lg:opacity-75 md:hidden"
          onClick={() => handleClick(-650)}
        >
          <ChevronLeftIcon className="w-6 h-6" aria-hidden="true" />
        </button>
      ) : null}
      <ul
        ref={ref}
        role="listitem"
        className="tabs__scrollbar--hide w-full py-10 flex items-center gap-5 overflow-x-auto scroll-smooth md:py-4"
        onScroll={handleScroll}
      >
        {providersList?.map((provider) => (
          <li key={provider.id}>
            <ProviderCard {...provider} />
          </li>
        ))}
      </ul>
      {!scrollEnd ? (
        <button
          name="Scroll through providers to right"
          aria-label="Scroll to right"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-full max-h-[216px] flex justify-center items-center z-10 bg-black/50 cursor-pointer opacity-20 hover:opacity-100 xl:max-h-[162px] lg:max-h-[136px] lg:opacity-75 md:hidden"
          onClick={() => handleClick(650)}
        >
          <ChevronRightIcon className="w-6 h-6" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
};

export default ProvidersList;
