import Carousel from "../components/Carousel";
import { useQuery } from "@tanstack/react-query";
import ComponentsLoader from "../components/ComponentsLoader";

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
          <h1>ERROR</h1>
        ) : (
          <Carousel movie={moviesSlider} />
        )}
      </section>
    </main>
  );
}
