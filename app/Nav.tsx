"use client";
import * as jwt from "jsonwebtoken";
import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Nav() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  useEffect(() => {
    const token = getCookie("token");
    const decoded: any = jwt.decode(token as string);
    setUsername(decoded.username);
  }, []);
  return (
    <nav className="navbar">
      <div className="flex-1">
        <h1 className="btn btn-ghost text-[1.6rem]">Baclearn</h1>
      </div>
      <div className="flex items-center justify-center w-full gap-[5vw]">
        <Link href={"/home"}>
          <button className="btn text-[1.3rem] btn-ghost">Home</button>
        </Link>
        {username == "jad" && (
          <button className="btn btn-ghost text-[1.3rem]">
            <Link href={"/add"}>Add</Link>
          </button>
        )}
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
