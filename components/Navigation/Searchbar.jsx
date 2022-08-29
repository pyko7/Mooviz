import { SearchIcon } from "@heroicons/react/solid";
import { XCircleIcon } from "@heroicons/react/solid";
import { useQuery } from "@tanstack/react-query";
import { getMoviesBySearchBar } from "../../pages/api/fetch";
import LoadingSpinner from "../../components/Loaders/LoadingSpinner";
import { useState } from "react";
import MovieList from "../MovieList";

const SearchBar = ({ setSearchBar }) => {
    const [search, setSearch] = useState(null)
    const { isLoading, isError, data } = useQuery(
        ["search", search], () =>
        getMoviesBySearchBar(search)
    );

    const handleInput = (event) => {
        let searchBarRegExp = new RegExp(/^([A-Za-z]+[\-'\s]?){2,}$/, 'g');
        let testInput = searchBarRegExp.test(event.target.value);
        return testInput ? setSearch(event.target.value) : setSearch(null);
    }

    const handleSearch = () => {
        searchBar.value = '';
        setSearch(null);
        return setSearchBar ? setSearchBar(null) : null;
    }

    return (
        <>
            <div className="w-full h-full px-2 flex justify-start items-center gap-x-2">
                <label htmlFor="searchBar" onClick={() => setSearchBar(true)} >
                    <SearchIcon aria-label='Search content' className="w-7 h-7 sm:w-6 sm:h-6" />
                </label>
                <input
                    type="text"
                    id="searchBar"
                    placeholder="Search"
                    className="w-full h-full px-2 bg-gray-200 outline-none rounded-md dark:bg-neutral-800 placeholder:font-medium"
                    onChange={(event) => handleInput(event)}
                />
                {search && <XCircleIcon aria-label="Close searchbar" className="w-8 h-8 cursor-pointer text-red-800 dark:text-neutral-200 hover:text-red-600 dark:hover:text-white" onClick={() => handleSearch()} />}
            </div>

            {search &&
                <section className="absolute top-24 left-0 w-full min-h-screen flex justify-center py-10 px-8 z-50 bg-gray-600 shadow-[inset_0_25px_50px_-12px_rgba(0,0,0,0.35)] dark:bg-neutral-700 dark:shadow-[inset_0_25px_50px_-12px_rgba(58,58,58,0.25)] xl:top-20">
                    {isLoading ? <LoadingSpinner />
                        : isError ?
                            <p className="text-center italic">
                                Sorry, an error has occured. Unfortunately, this content
                                isn&apos;t available.
                            </p>
                            : <div className="w-full max-w-[1920px] py-10 px-14">
                                {search && <MovieList movies={data.results} search={search} removeSearch={setSearch} />}
                            </div>
                    }
                </section>
            }

        </>
    );
}

export default SearchBar;