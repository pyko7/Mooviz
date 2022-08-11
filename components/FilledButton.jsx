import Link from "next/link";

const FilledButton = () => {
  return (
    <Link href="/">
      <a className="min-w-[145px] px-7 py-4 rounded-md text-white text-center bg-green-600">Get started</a>
    </Link>
  );
};

export default FilledButton;
