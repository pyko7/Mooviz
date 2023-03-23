import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/outline";

const Custom404 = () => {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center gap-y-4 dark:text-white">
      <h1 className="text-9xl font-bold">Oops</h1>
      <p className="mt-8 text-4xl">Page not found</p>
      <p className="text-2xl">
        The page you are looking for does not exist. It might have been moved or
        deleted.
      </p>
      <Link
        href="/"
        className="w-fit mt-8 px-6 py-3 flex items-center gap-x-1 bg-red-800 text-white rounded-lg text-xl dark:bg-neutral-400 dark:text-black dark:font-medium hover:bg-red-700 dark:hover:bg-neutral-300"
      >
        <HomeIcon className="w-5 h-5" />
        Home
      </Link>
    </section>
  );
};

export default Custom404;
