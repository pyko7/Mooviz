import MoviesListByGenre from "@/components/Lists/MoviesListByGenre";
import ListByGenreSkeleton from "@/components/Loaders/ListByGenreSkeleton";
import { useGenreContext } from "@/context/MoviesGenreContext";
import { useRouter } from "next/router";
import ProviderBanner from "@/components/ProviderBanner";
import { providersList } from "@/utils/providersList";
import { useProvidersContext } from "@/context/ProdiversContext";
import Head from "next/head";

const ProviderPage = () => {
  const { genresList } = useGenreContext();
  const { popularMoviesByGenre } = useProvidersContext();
  const { query } = useRouter();
  const provider = providersList.find(
    (provider) => provider.query_name == query.provider
  );

  return (
    <>
      <Head>
        <title>${provider?.provider_name} - Mooviz</title>
        <meta
          name="description"
          content={`Découvrez la sélection de films proposé par ${provider?.provider_name}`}
        />
        {/* Open Graph */}
        <meta property="og:title" content="Genres" />
        <meta
          property="og:description"
          content={`Découvrez la sélection de films proposé par ${provider?.provider_name}`}
        />
      </Head>
      <section className="w-full">
        <ProviderBanner provider={provider} />

        <div className="w-full py-6 px-4">
          {genresList.isLoading ? <ListByGenreSkeleton /> : null}
          {genresList.isError ? (
            <p className="text-center italic">
              Sorry, an error has occured. Unfortunately, this content
              isn&apos;t available.
            </p>
          ) : null}
          {popularMoviesByGenre?.map((movies) => (
            <div className="w-full" key={movies.genre}>
              {movies.movies.length === 0 ? null : (
                <h2 className="text-2xl font-bold uppercase xl:text-xl sm:mt-10 sm:text-lg">
                  {movies.genre}
                </h2>
              )}
              <MoviesListByGenre movies={movies.movies} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
export default ProviderPage;
