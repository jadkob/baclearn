"use client";
import { useEffect, useState } from "react";
import { Course } from "../types";
import Loading from "../LoadingComp";
import Error from "../Error";
import axios from "axios";
import { getCookie } from "cookies-next";
import { getId } from "../getId";
import { useRouter } from "next/navigation";
import Nav from "../Nav";
import Link from "next/link";
export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/courses", {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        setError(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      <Nav />
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="flex h-screen items-center justify-center">
          <Error error={error} className={"text-[2.3rem]"} />
        </div>
      ) : (
        <>
          <div className="flex justify-center mt-[5vh]">
            <Link href="/watchedCourses">
              <button className="btn text-[2rem] btn-ghost">
                Watched Courses
              </button>
            </Link>
          </div>
          <div className="flex flex-col items-center mt-[15vh] gap-[10vh]">
            {courses.map((course) => (
              <div
                className="border border-solid w-fit h-fit p-[3vw] flex flex-col gap-[1vh] items-center"
                onClick={() => {
                  router.push(`/course/${String(course._id)}`);
                }}
              >
                <img
                  src={`http://img.youtube.com/vi/${getId(
                    course.ytLink as string
                  )}/0.jpg`}
                  alt="Youtube Thumbnail"
                  className="w-[30vw] aspect-video"
                />
                <h1 className="text-[2rem] text-center">Name: {course.name}</h1>
                <h2 className="line-clamp-3 w-[40vw] text-center">
                  Descrpition: {course.description}
                </h2>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
