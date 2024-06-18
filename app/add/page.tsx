"use client";
import { useRef, useState } from "react";
import Nav from "../Nav";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Loading from "../LoadingComp";

export default function Add() {
  const name = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const ytLink = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      <Nav />
      {loading ? (
        <Loading />
      ) : (
        <form
          className="flex flex-col items-center justify-center h-screen gap-[5vh]"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            axios
              .post(
                "/api/courses",
                {
                  name: name.current?.value,
                  description: description.current?.value,
                  ytLink: ytLink.current?.value,
                },
                {
                  headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                  },
                }
              )
              .then((res) => {
                alert("Added!");
                router.push("/home");
              })
              .finally(() => setLoading(false));
          }}
        >
          <input
            type="text"
            className="input input-bordered"
            placeholder="Name"
            ref={name}
          />
          <input
            type="text"
            className="input input-bordered"
            placeholder="Description"
            ref={description}
          />
          <input
            type="text"
            className="input input-bordered"
            placeholder="Youtube Link"
            ref={ytLink}
          />
          <button className="btn btn-primary btn-wide">Add</button>
        </form>
      )}
    </>
  );
}
