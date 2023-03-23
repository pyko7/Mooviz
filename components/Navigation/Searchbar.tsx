import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { getMoviesBySearch } from "@/utils/getMoviesBySearch";
import LoadingSpinner from "../Loaders/LoadingSpinner";
import { ChangeEvent, useState } from "react";
import MovieList from "../Lists/MovieList";
import { HandleSearchBarProps } from "@/types/header";

const SearchBar = ({ searchBar, setSearchBar }: HandleSearchBarProps) => {
  const [search, setSearch] = useState("");
  const { isLoading, isError, data } = useQuery(["search", search], () =>
    getMoviesBySearch(search)
  );

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    let searchBarRegExp = new RegExp(/^([A-Za-z]+[\-'\s]?){2,}$/, "g");
    let testInput = searchBarRegExp.test(event.target.value);
    return testInput ? setSearch(event.target.value) : setSearch("");
  };

  const handleSearch = () => {
    setSearch("");
    return setSearchBar ? setSearchBar(false) : null;
  };

  return (
    <>
      <div
        className={`w-full pl-3 flex items-center gap-2  rounded-md ${
          searchBar ? "backdrop-blur-md bg-white/10" : ""
        }`}
      >
        <label htmlFor="searchBar" onClick={() => setSearchBar(true)}>
          <MagnifyingGlassIcon
            tabIndex={0}
            aria-label="Search content"
            className="w-7 h-7 sm:w-6 sm:h-6"
          />
        </label>
        <input
          type="text"
          id="searchBar"
          placeholder="Search"
          className={`${searchBar ? "block" : "hidden"}`}
          onChange={(event) => handleInput(event)}
        />
        {search && (
          <XCircleIcon
            aria-label="Close searchbar"
            className="w-8 h-8 cursor-pointer  hover:text-white"
            onClick={() => handleSearch()}
          />
        )}
      </div>

      {search && (
        <section className="absolute top-24 left-0 w-full min-h-screen flex justify-center py-10 px-8 z-50 bg-gray-600 shadow-[inset_0_25px_50px_-12px_rgba(0,0,0,0.35)]">
          {isLoading ? (
            <LoadingSpinner />
          ) : isError ? (
            <p className="text-center italic">
              Sorry, an error has occured. Unfortunately, this content
              isn&apos;t available.
            </p>
          ) : (
            <div className="w-full max-w-[1920px] py-10 px-14">
              {search && (
                <MovieList
                  movies={data.results}
                  search={search}
                  removeSearch={setSearch}
                />
              )}
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default SearchBar;
