import { AppProps as NextAppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "../components/Layout";
import "@/styles/globals.css";
import GenreProvider from "@/context/MoviesGenreContext";
import MoviesProvidersProvider from "@/context/ProdiversContext";

type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

export default function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <GenreProvider>
        <MoviesProvidersProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MoviesProvidersProvider>
      </GenreProvider>
    </QueryClientProvider>
  );
}
