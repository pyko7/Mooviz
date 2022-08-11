import { SearchIcon } from "@heroicons/react/solid";

const SearchBar = ({ setSearchBar }) => {
    return (
        <div className="w-full h-full pl-2 flex justify-start items-center gap-x-2">
            <label htmlFor="searchBar" onClick={() => { setSearchBar(true) }}>
                <SearchIcon className="w-7 h-7" aria-label="Search icon" />
            </label>
            <input
                type="text"
                id="searchBar"
                placeholder="Search"
                className="w-full h-full px-2 bg-slate-200 outline-none rounded-md placeholder:font-medium"
            />
        </div>
    );
}

export default SearchBar;