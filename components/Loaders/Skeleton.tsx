type Props = {
  width: number | string;
  height: number | string;
  light?: boolean;
};

/**
 * @props width - width of the element
 * @props height - height of the element
 * @props optionnal - light: background color of the element
 */
const Skeleton = ({ width, height, light }: Props) => {
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
