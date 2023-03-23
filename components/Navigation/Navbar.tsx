import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <ul className="w-fit flex items-center gap-x-10 font-bold uppercase">
        <li>
          <Link href="/movies">Movies</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
