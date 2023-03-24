import { MoviesProvider } from "@/types/movies";

const ProviderCard = ({
  provider_name,
  main_color,
  lighten_color,
}: MoviesProvider) => {
  return (
    <a
      href="#"
      className={`w-[500px] flex items-center justify-center rounded-md uppercase font-bold tracking-wide text-xl aspect-video hover:brightness-110`}
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
