import { MoviesProvider } from "@/types/movies";

const ProviderBanner = ({
  provider,
}: {
  provider: MoviesProvider | undefined;
}) => {
  return (
    <div
      className="provider_banner relative w-full h-[500px] flex justify-center items-center uppercase font-bold text-neutral-200 text-5xl bg-neutral-700 sm:h-screen"
      style={{
        background: `linear-gradient(60deg, ${provider?.main_color} 60%, ${provider?.lighten_color} 100%)`,
      }}
    >
      {provider?.provider_name}
    </div>
  );
};

export default ProviderBanner;
