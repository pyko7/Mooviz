import LoadingSpinner from "../Loaders/LoadingSpinner";
import ActorCard from "../Cards/ActorCard";

const ActorList = ({ actors }) => {
    return (
        <div className="w-full grid grid-cols-6 xl:grid-cols-4 lg:grid-cols-3 lg:gap-y-14 md:grid-cols-2 sm:gap-y-4" >
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