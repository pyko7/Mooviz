import { Skeleton } from "@/types/components";

/**
 * @props width - width of the element
 * @props height - height of the element
 * @props optionnal - light: background color of the element
 * @props optionnal - circle: shape of the element
 */
const Skeleton = ({ width, height, light, circle }: Skeleton) => {
  return (
    <div
      className={`${!light ? "bg-neutral-700" : " bg-neutral-400"} 
      ${circle ? "rounded-[50%]" : "rounded-md"}
      animate-pulse `}
      style={{
        width,
        height,
      }}
    ></div>
  );
};

export default Skeleton;
