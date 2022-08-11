import SearchBar from "./Searchbar";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between ">
      <ul className="w-full flex items-center gap-x-10 font-bold">
        <li>
          <a>Home</a>
        </li>
        <li>
          <a>Movies</a>
        </li>
        <li>
          <a>
            Series <em>(Soon available)</em>
          </a>
        </li>
      </ul>
      <div className="w-80 h-10 rounded-md bg-gray-200">
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
