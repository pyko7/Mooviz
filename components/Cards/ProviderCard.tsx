import { MoviesProvider } from "@/types/movies";

const ProviderCard = ({
  provider_name,
  main_color,
  lighten_color,
}: MoviesProvider) => {
  return (
    <a
      href="#"
      className={`w-96 aspect-video px-2 flex items-center justify-center text-center rounded-md uppercase font-bold tracking-wide text-xl hover:brightness-110 xl:w-72 lg:w-60 md:w-52`}
      style={{
        background: `linear-gradient(60deg, ${main_color} 60%, ${lighten_color} 100%)`,
        boxShadow:
          "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
      }}
    >
      <p>{provider_name}</p>
    </a>
  );
};

export default ProviderCard;
