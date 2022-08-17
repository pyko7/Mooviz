const LoadingMovieCard = () => {
    return (
        <article className="relative w-1/4 xl:min-w-[390px] lg:w-full lg:min-w-[auto] md:w-full" >
            <div className="animate-pulse absolute inset-0 w-full h-[300px] bg-black/95 rounded-xl z-10 xl:h-[400px] lg:h-[450px] md:h-80 sm:h-72"></div>
        </article>
    );
}

export default LoadingMovieCard;