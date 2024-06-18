"use client";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();
  return (
    <nav className="navbar">
      <div className="flex-1">
        <h1 className="btn btn-ghost text-[1.6rem]">Baclearn</h1>
      </div>
      <div className="flex items-center justify-center w-full gap-[5vw]">
        <Link href={"/home"}>
          <button className="btn text-[1.3rem] btn-ghost">Home</button>
        </Link>
        <button
          className="btn btn-ghost text-[1.3rem]"
          onClick={() => {
            deleteCookie("token");
            router.push("/login");
          }}
        >
          LogOut
        </button>
      </div>
    </nav>
  );
}
