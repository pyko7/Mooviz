import { Skeleton } from "@/types/components";

/**
 * @props width - width of the element
 * @props height - height of the element
 * @props optionnal - light: background color of the element
 */
const Skeleton = ({ width, height, light }: Skeleton) => {
  return (
    <div
      className={`${
        !light ? "bg-neutral-700" : " bg-neutral-400"
      } animate-pulse rounded-md`}
      style={{
        width,
        height,
      }}
    ></div>
  );
};

export default Skeleton;
