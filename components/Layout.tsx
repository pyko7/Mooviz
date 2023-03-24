import { ChildrenProps } from "@/types/context";
import Head from "next/head";
import Header from "./Navigation/Header";

const Layout = ({ children }: ChildrenProps) => {
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

      <Header />
      <main className="absolute top-0 left-0 w-full flex flex-col items-center bg-neutral-800 text-neutral-100 shadow-[inset_0_25px_50px_-12px_rgba(58,58,58,0.25)]">
        {children}
      </main>
    </>
  );
};

export default Layout;
