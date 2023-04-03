import { MoviesProvider } from "@/types/movies";

//lighten color is lighten by 20%
export const providersList: MoviesProvider[] = [
  {
    id: 8,
    provider_name: "Netflix",
    main_color: "#e50914",
    lighten_color: "#f62d37",
    query_name: "netflix",
  },
  {
    id: 337,
    provider_name: "Disney +",
    main_color: "#12194A",
    lighten_color: "#222f8d",
    query_name: "disney-plus",
  },
  {
    id: 56,
    provider_name: "OCS",
    main_color: "#ff6600",
    lighten_color: "#ff8432",
    query_name: "ocs",
  },
  {
    id: 2,
    provider_name: "Apple TV",
    main_color: "#555555",
    lighten_color: "#777777",
    query_name: "apple-tv",
  },
  {
    id: 58,
    provider_name: "Canal VOD",
    main_color: "#8e1f7c",
    lighten_color: "#c52bac",
    query_name: "canal-vdo",
  },
  {
    id: 531,
    provider_name: "Paramount +",
    main_color: "#0037c5",
    lighten_color: "#044aff",
    query_name: "paramount-plus",
  },
];
