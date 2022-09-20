import LoadingSpinner from "../Loaders/LoadingSpinner";
import ActorCard from "../Cards/ActorCard";

const ActorList = ({ actors }) => {
    console.log(actors.data);
    return (
        <div className="w-full p-1 grid grid-cols-6 gap-6 xl:grid-cols-4 lg:grid-cols-3 lg:gap-y-14 md:grid-cols-2 sm:grid-cols-1" >
            {actors.isLoading ? (
                <LoadingSpinner />
            ) : actors.isError ? (
                <p className="text-center italic">
                    Sorry, an error has occured. Unfortunately, this content
                    isn&apos;t available.
                </p>
            )
                : (
                    <>
                        {actors.data.cast.slice(0, 6).map((actor) => (
                            <ActorCard actor={actor} key={actor.id} />
                        ))}
                    </>
                )}
        </div>
    );
}

export default ActorList;