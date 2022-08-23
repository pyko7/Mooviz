import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/assets/logo.png"
import MobileNavbar from "./MobileNavbar";
import Navbar from "./Navbar"
import { MenuIcon } from "@heroicons/react/outline";
import SearchBar from "./Searchbar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchBar, setSearchBar] = useState(false);

  return (
    <header className="w-full max-w-[1920px] my-0 mx-auto h-24 px-20 flex items-center justify-start gap-x-20 xl:h-20 xl:justify-between lg:px-12 md:gap-x-0 md:px-4 sm:px-4">
      <div className="w-fit h-full px-2 flex justify-center items-center bg-red-800">
        <Link href="/">
          <a>
            <h1>
              <Image
                src={logo}
                width={40}
                height={60}
                layout="fixed"
                objectFit="contain"
                alt="Mooviz - Home"
              />
            </h1>
          </a>
        </Link>
      </div>

      <div className="w-full lg:hidden">
        <Navbar />
      </div>

      <div className="lg:w-3/4 lg:flex lg:justify-end lg:items-center lg:gap-x-16 lg:rounded-md sm:justify-between sm:gap-x-1">

        <div className="lg:w-full lg:flex lg:items-center lg:justify-end">
          <div className={`w-80 h-10 rounded-md bg-gray-200 ${searchBar ? "lg:w-full lg:min-w-[130px] lg:px-2 lg:flex lg:items-center lg:gap-x-3 lg:duration-700 lg:ease-out" : "lg:w-0 lg:h-0 lg:duration-700 lg:ease-in sm:mr-14"}`}>
            <SearchBar setSearchBar={setSearchBar} />
          </div>
        </div>

        <div className="hidden lg:block lg:w-fit">
          {/* <div className="w-fit"> */}
            <MenuIcon aria-label="Open navigation menu" className="w-8 h-8 sm:w-6 sm:h-6" onClick={() => setIsOpen(true)} />
          {/* </div> */}
          <div className="lg:block">
            <MobileNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
