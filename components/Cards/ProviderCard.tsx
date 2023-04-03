import { useProvidersContext } from "@/context/ProdiversContext";
import { MoviesProvider } from "@/types/movies";
import Link from "next/link";

const ProviderCard = ({
  id,
  provider_name,
  main_color,
  lighten_color,
  query_name,
}: MoviesProvider) => {
  const { setProvider } = useProvidersContext();

  const handleClick = () => {
    return setProvider(`${id}`);
  };
  
  return (
    <Link
      href={`/providers/${query_name}`}
      className={`w-96 aspect-video px-2 flex items-center justify-center text-center rounded-md uppercase font-bold tracking-wide text-xl shadow-horizontalCardsShadow hover:brightness-110 xl:w-72 lg:w-60 md:w-52`}
      style={{
        background: `linear-gradient(60deg, ${main_color} 60%, ${lighten_color} 100%)`,
      }}
      onClick={handleClick}
    >
      <p>{provider_name}</p>
    </Link>
  );
};

export default ProviderCard;
