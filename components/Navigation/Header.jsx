import { useState } from "react";
import Image from "next/image";
import logo from "../../public/assets/logo.png"
import MobileNavbar from "./MobileNavbar";
import Navbar from "./Navbar"
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import SearchBar from "./Searchbar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchBar, setSearchBar] = useState(false);

  return (
    <header className="w-full max-w-[1920px] my-0 mx-auto h-24 px-20 flex items-center justify-start gap-x-20 xl:justify-between md:px-4  sm:gap-x-10 sm:px-8">
      <div className="w-fit h-full px-2 flex justify-center items-center bg-red-800">
        <h1>
          <Image
            src={logo}
            width={60}
            height={60}
            layout="fixed"
            objectFit="contain"
            alt="Mooviz - Home"
          />
        </h1>
      </div>
      <div className="w-full lg:hidden">
        <Navbar />
      </div>
      <div className="hidden lg:block md:w-full">
        <div className="w-full flex items-center justify-end gap-x-16">
          <div
            className={`${searchBar ? "w-full h-10 px-2 flex items-center gap-x-3 rounded-md bg-slate-200 duration-700 ease-out " : "w-0 h-0 duration-700 ease-in"} `} >
            <SearchBar setSearchBar={setSearchBar} />
            <XIcon className={`transition-[width] ${searchBar ? "w-8 h-8 duration-700 linear" : "w-0 h-0 duration-700 ease-in"}`} onClick={() => setSearchBar(false)} />
          </div>
          <div className="w-fit">
            <MenuIcon className="w-8 h-8" onClick={() => setIsOpen(true)} />
          </div>
        </div>
        <div className="lg:block">
          <MobileNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;
