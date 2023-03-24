import { MoviesProvider } from "@/types/movies";

export const getProviders = (array: MoviesProvider[]) => {
  let providersName = [
    "Netflix",
    "Disney Plus",
    "Amazon Prime Video",
    "Paramount Plus",
    "Apple TV",
    "Crunchyroll",
    "HBO",
  ];
  let providers: MoviesProvider[] = [];
  array.forEach((provider) => {
    if (providersName.find((name) => name === provider.provider_name)) {
      if (
        providers.find(
          (providerInArray) =>
            provider.provider_name === providerInArray.provider_name
        )
      ) {
        return;
      }
      providers.push(provider);
    }
  });
  return providers;
};
