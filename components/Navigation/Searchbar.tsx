import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { getMoviesBySearch } from "@/utils/api/getMoviesBySearch";
import LoadingSpinner from "../Loaders/LoadingSpinner";
import { ChangeEvent, useState } from "react";
import MovieList from "../Lists/MovieList";
import { HandleSearchBarProps } from "@/types/header";

const SearchBar = ({ searchBar, setSearchBar }: HandleSearchBarProps) => {
  const [search, setSearch] = useState("");
  const { isLoading, isError, data } = useQuery(["search", search], () =>
    getMoviesBySearch(search)
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleReset = () => {
    return setSearch("");
  };

  const handleClose = () => {
    setSearch("");
    return setSearchBar(false);
  };

  return (
    <>
      <div className="absolute left-0 w-full px-10 py-6 flex items-center gap-6 z-[100] border-b-[1px] border-b-white md:top-0 md:px-6 sm:py-4">
        <button
          className="w-8 h-8 text-neutral-200 cursor-pointer hover:text-white sm:w-7 sm:h-7"
          aria-label="Close search page"
          onClick={handleClose}
        >
          <ArrowLeftIcon aria-hidden="true" />
        </button>
        <input
          autoFocus
          type="text"
          id="searchbar"
          placeholder="Search"
          value={search}
          className={`${
            searchBar ? "block" : "hidden"
          } w-full h-full px-4 py-2 bg-transparent outline-none text-xl uppercase placeholder:font-medium focus:outline-none focus-visible:outline-none sm:text-lg`}
          onChange={(event) => handleChange(event)}
        />

        {search ? (
          <button
            className="absolute right-40 w-8 h-8 text-neutral-200 cursor-pointer hover:text-white xl:right-20 md:right-4 sm:w-6 sm:h-6"
            aria-label="Reset text field value"
            onClick={handleReset}
          >
            <XMarkIcon aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <div className="fixed top-0 left-0 w-full min-h-screen flex justify-center py-10 px-8 z-50 bg-neutral-900 shadow-[inset_0_25px_50px_-12px_rgba(0,0,0,0.35)]">
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <p className="text-center italic">
            Sorry, an error has occured. Unfortunately, this content isn&apos;t
            available.
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
      </div>
    </>
  );
};

export default SearchBar;
