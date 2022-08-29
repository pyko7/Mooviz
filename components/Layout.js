import Head from "next/head";
import Header from "./Navigation/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Mooviz</title>
        <meta
          name="description"
          content="Mooviz helps you to find your next movie"
        />
        <link rel="icon" type="image/x-icon" href="/assets/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Mooviz" />
        <meta
          property="og:description"
          content="Mooviz helps you to find your next movie"
        />
      </Head>

      <div className="content dark:bg-neutral-900">
        <Header />
        <main className="w-full flex flex-col items-center bg-gray-200  dark:bg-neutral-800 dark:shadow-[inset_0_25px_50px_-12px_rgba(58,58,58,0.25)]">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
