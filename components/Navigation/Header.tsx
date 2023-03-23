import { useState } from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";
import SearchBar from "./Searchbar";
import { Bars3Icon } from "@heroicons/react/24/outline";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const searchBarProps = { searchBar, setSearchBar };

  return (
    <header className="fixed w-full my-0 mx-auto h-24 px-20 flex items-center gap-16 justify-start bg-transparent text-neutral-100 z-10">
      <Link href="/" className="mb-2 text-3xl font-['Delicious_Handrawn']">
        Mooviz
      </Link>
      <div className="w-full max-w-lg h-full flex items-center gap-6">
        <Navbar />
        <SearchBar {...searchBarProps} />
      </div>

      <div className="hidden lg:block lg:w-fit">
        <Bars3Icon
          aria-label="Open navigation menu"
          className="w-8 h-8 sm:w-6 sm:h-6"
          onClick={() => setIsOpen(true)}
        />
        <div className="lg:block">
          <MobileNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;
