const GenreCard = ({ genre }) => {
    return (
        <article className="h-20 rounded-xl bg-red-800 text-white hover:bg-red-800/75" key={genre.id} >
            <div className="w-full h-full flex items-center justify-center font-medium">
                <h3>{genre.name}</h3>
            </div>
        </article>
    );
}

export default GenreCard;