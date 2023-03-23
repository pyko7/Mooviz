import Link from "next/link";

const GenreCard = ({ genre }) => {
  return (
    <Link
      href={{
        pathname: "/movies/genre/[id]",
        query: { id: genre.id, name: genre.name },
      }}
      as={`/movies/genre/${genre.id}`}
      aria-label={genre.name}
    >
      <article
        className="h-20 rounded-xl bg-red-800 text-white dark:bg-neutral-600 hover:bg-red-800/75 dark:hover:bg-neutral-500"
        key={genre.id}
      >
        <div className="w-full h-full flex items-center justify-center font-medium">
          <h3>{genre.name}</h3>
        </div>
      </article>
    </Link>
  );
};

export default GenreCard;
