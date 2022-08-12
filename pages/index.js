import Carousel from "../components/Carousel";
import { useQuery } from "@tanstack/react-query";
import ComponentsLoader from "../components/ComponentsLoader";
import { ChevronRightIcon } from "@heroicons/react/solid";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const moviesSlider = [];
  /*options for datas fetching*/
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
      "X-RapidAPI-Host": `${process.env.NEXT_PUBLIC_API_HOST}`,
    },
  };
  const getRandomId = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };
  /*function gets the list of movies*/
  const getRandomMovies = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts`,
      options
    );
    if (!res.ok) {
      const message = `An error has occured: ${res.status}`;
      throw new Error(message);
    }
    return await res.json();
  };

  const { isLoading, isError, data } = useQuery(["movies"], getRandomMovies);

  const createCarouselArray = () => {
    if (data) {
      const movies = getRandomId(data, 3);
      moviesSlider.push(...movies);
    } else {
      return null;
    }
  };

  createCarouselArray();

  return (
    <main className="w-full flex flex-col items-center bg-gray-200 shadow-[inset_0_25px_50px_-12px_rgba(0,0,0,0.25)]">
      <section className="w-full max-w-[1920px] py-10 overflow-x-hidden xl:w-11/12 md:w-full">
        {isLoading ? (
          <ComponentsLoader />
        ) : isError ? (
          <p className="text-center italic">
            Sorry, an error has occured. Unfortunately, this content isn't
            available.
          </p>
        ) : (
          <Carousel movie={moviesSlider} />
        )}
      </section>
      <section className="w-full max-w-[1920px] py-10 px-14 flex flex-col gap-y-10 overflow-x-hidden  xl:w-11/12 md:w-full">
        <div>
          <select
            name="genres"
            id="genres"
            className="p-2 rounded-[4px] font-medium bg-white shadow-md"
          >
            <option value="">Genres</option>
            <option value="action">Action</option>
            <option value="documentaries">Documentaries</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="thriller">Thriller</option>
          </select>
        </div>

        <div className="w-full flex flex-col gap-y-6">
          <div className="w-full flex justify-between items-center uppercase">
            <h2 className="text-xl tracking-wide font-bold">
              Popular right now
            </h2>
            <div className="w-fit flex items-center gap-x-1 font-medium hover:underline">
              <p>See all</p>
              <ChevronRightIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="w-full flex justify-evenly gap-x-8 xl:flex-wrap xl:gap-8 lg:justify-around md:flex-col">
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
          </div>
        </div>
      </section>
    </main>
  );
}
