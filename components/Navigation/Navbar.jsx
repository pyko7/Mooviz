import SearchBar from "./Searchbar";
import Link from "next/link";


const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between ">
      <ul className="w-full flex items-center gap-x-10 font-bold">
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/movies">
            <a>Movies</a>
          </Link>
        </li>
        <li>
          Series <em>(Soon available)</em>
        </li>
      </ul>
      {/* <div className="w-80 h-10 rounded-md bg-gray-200">
        <SearchBar />
      </div> */}
    </nav>
  );
};

export default Navbar;
