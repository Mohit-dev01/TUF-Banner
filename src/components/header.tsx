"use client";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <div className="flex items-center justify-between bg-black px-[30px] py-4 font-bold text-white md:px-[80px]">
        <Link className="rounded-full bg-red-700 px-3 py-3" href="/">
          TUF
        </Link>
        <div className="flex gap-2 ">
          <Link className="hover:text-orange-400" href="/login">
            Login
          </Link>
          <Link className="hover:text-orange-400" href="/register">
            Register
          </Link>
          <Link className="hover:text-orange-400" href="/dashboard">
            Dashboard
          </Link>
        </div>
      </div>
    </>
  );
};
export default Header;
