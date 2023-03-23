import { useState } from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";
import SearchBar from "./Searchbar";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const searchBarProps = { searchBar, setSearchBar };

  const handleClick = () => {
    setSearchBar(true);
  };

  return (
    <header className="fixed w-full my-0 mx-auto h-24 px-20 flex items-center gap-16 justify-start bg-transparent text-neutral-100 z-10 xl:px-10 md:justify-between sm:px-4
    sm:bg-gradientBlackTop">
      <Link href="/" className="mb-2 text-3xl font-['Delicious_Handrawn']">
        Mooviz
      </Link>
      <div className="w-full h-full flex items-center gap-6 md:hidden">
        <Navbar />
        <button type="button" aria-label="Search content" onClick={handleClick}>
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="w-7 h-7 cursor-pointer"
          />
        </button>
        {!searchBar ? null : <SearchBar {...searchBarProps} />}
      </div>

      <div className="hidden md:w-fit md:flex md:gap-10">
        <button type="button" aria-label="Search content" onClick={handleClick}>
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="w-7 h-7 cursor-pointer"
          />
        </button>
        <button
          type="button"
          aria-label="Open navigation menu"
          className="w-8 h-8"
          onClick={() => setIsOpen(true)}
        >
          <Bars3Icon aria-hidden="true" />
        </button>
        {!searchBar ? null : <SearchBar {...searchBarProps} />}
        <div className="fixed right-0">
          <MobileNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;
