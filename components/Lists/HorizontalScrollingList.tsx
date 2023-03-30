import { useScrollX } from "@/hooks/useScrollX";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { HorizontalScrollingList, ListType } from "@/types/components";

const HorizontalScrollingList = ({
  children,
  scroll,
  type,
}: HorizontalScrollingList) => {
  const { scrollX, handleClick, ref, handleScroll, scrollEnd } = useScrollX();

  return (
    <div className="relative w-full">
      {scrollX !== 0 ? (
        <button
          name="Scroll through list to the left"
          aria-label="Scroll to left"
          className={`absolute left-0 top-1/2 -translate-y-1/2
          ${
            type === ListType.Text ? "w-10 h-10" : "w-14 h-14"
          } rounded-[50%] flex justify-center items-center z-10 bg-black cursor-pointer opacity-50 hover:opacity-80 md:hidden`}
          onClick={() => handleClick(-scroll)}
        >
          <ChevronLeftIcon className="w-6 h-6" aria-hidden="true" />
        </button>
      ) : null}
      <ul
        ref={ref}
        role="listitem"
        className="tabs__scrollbar--hide w-full flex gap-x-5 overflow-x-auto scroll-smooth md:py-4"
        onScroll={handleScroll}
      >
        {children}
      </ul>
      {!scrollEnd ? (
        <button
          name="Scroll through list to the right"
          aria-label="Scroll to right"
          className={`absolute right-0 top-1/2 -translate-y-1/2
          ${
            type === ListType.Text ? "w-10 h-10" : "w-14 h-14"
          } rounded-[50%] flex justify-center items-center z-10 bg-black cursor-pointer opacity-50 hover:opacity-80 md:hidden`}
          onClick={() => handleClick(scroll)}
        >
          <ChevronRightIcon className="w-6 h-6" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
};

export default HorizontalScrollingList;
