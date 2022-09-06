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
    </nav>
  );
};

export default Navbar;
