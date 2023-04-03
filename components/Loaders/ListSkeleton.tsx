import { ListSkeleton } from "@/types/components";

/**
 * @props length this is the length of the mapped array
 * @props optionnal - vertical: this is the direction of the list
 * @props optionnal - centered: this is the position of the list compared to its parent
 * @props optionnal - wrap: defines if the list is wrapped or not
 */
const ListSkeleton = ({
  length,
  vertical,
  centered,
  wrap,
  children,
}: ListSkeleton) => {
  return (
    <div className="w-full">
      <ul
        className={`w-full flex gap-6
        ${vertical ? "flex-col" : ""}
        ${vertical && centered ? "items-center" : ""}
        ${!vertical && centered ? "justify-center" : ""}
        ${wrap ? "flex-wrap" : "flex-nowrap"}
        `}
      >
        {Array(length)
          .fill(1)
          .map((x, i) => (
            <li key={i}>{children}</li>
          ))}
      </ul>
    </div>
  );
};

export default ListSkeleton;
