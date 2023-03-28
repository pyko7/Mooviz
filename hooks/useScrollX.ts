import { useEffect, useRef, useState } from "react";

export const useScrollX = () => {
  const [scrollX, setScrollX] = useState(0); // For detecting start scroll postion
  const [scrollEnd, setScrollEnd] = useState(false); // For detecting end of scrolling
  const ref = useRef<HTMLUListElement>(null);

  const handleClick = (scrollOffset: number) => {
    if (!ref.current) {
      return;
    }
    ref.current.scrollLeft += scrollOffset;
    setScrollX(scrollX + scrollOffset);
  };
  const handleScroll = () => {
    if (!ref.current) {
      return;
    }
    setScrollX(ref.current.scrollLeft);
    if (
      Math.floor(ref.current.scrollWidth - ref.current.scrollLeft) <=
      ref.current.offsetWidth
    ) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  };

  useEffect(() => {
    const scrollButtonVisible = () => {
      if (ref.current === null) {
        return;
      }
      if (
        Math.floor(ref.current.scrollWidth - ref.current.scrollLeft) <=
        ref.current.offsetWidth
      ) {
        setScrollEnd(true);
      } else {
        setScrollEnd(false);
      }
    };
    scrollButtonVisible();
  }, [ref.current?.scrollWidth, ref.current?.scrollLeft]);
  return { ref, scrollX, scrollEnd, handleClick, handleScroll };
};
