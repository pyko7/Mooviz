import Link from "next/link"

const GenreCard = ({ genre }) => {
    return (
        <Link href={{
            pathname: "/movies/genre/[id]",
            query: { id: genre.id, name: genre.name },
        }}
            as={`/movies/genre/${genre.id}`}>
            <a>
                <article className="h-20 rounded-xl bg-red-800 text-white hover:bg-red-800/75" key={genre.id} >
                    <div className="w-full h-full flex items-center justify-center font-medium">
                        <h3>{genre.name}</h3>
                    </div>
                </article>
            </a>
        </Link >
    );
}

export default GenreCard;