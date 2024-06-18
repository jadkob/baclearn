"use client";

import { Course } from "@/app/types";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as jwt from "jsonwebtoken";
import { log } from "util";
import Nav from "@/app/Nav";

export default function CourseFunc() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [course, setCourse] = useState<Course>();
  const [userID, setUserID] = useState("");
  useEffect(() => {
    const token = getCookie("token") as string;
    const decoded: any = jwt.decode(token);
    setUserID(decoded.id);
  }, []);
  useEffect(() => {
    setLoading(true);
    axios
      .post(
        "/api/courses/get",
        {
          courseId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      )
      .then((res) => {
        setCourse(res.data);
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
      <div className="flex flex-col gap-[2vh] items-center mt-[25vh]">
        <iframe
          src={course?.ytLink as string}
          className="w-[70vw] aspect-video"
        ></iframe>
        <h1 className="capitalize font-bold text-[1.5rem]">{course?.name}</h1>
        <h2 className="text-center">{course?.description}</h2>
        <h2>Likes: {course?.likes as number}</h2>
        {course?.likedUsers.includes(userID) ? (
          <button
            className="btn btn-primary"
            onClick={async () => {
              setCourse((prev: any) => {
                return {
                  ...prev,
                  likedUsers: prev.likedUsers.filter(
                    (user: any) => user !== userID
                  ),
                  likes: (prev?.likes as number) - 1,
                };
              });
              await axios
                .post(
                  "/api/courses/dislike",
                  {
                    courseId: id,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${getCookie("token")}`,
                    },
                  }
                )
                .catch((err) => {
                  console.log(err.response);
                });
            }}
          >
            Dislike
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={async () => {
              setCourse((prev: any) => {
                return {
                  ...prev,
                  likedUsers: [...(prev?.likedUsers as any), userID],
                  likes: (prev?.likes as number) + 1,
                };
              });
              await axios
                .post(
                  "/api/courses/like",
                  {
                    courseId: id,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${getCookie("token")}`,
                    },
                  }
                )
                .catch((err) => {
                  console.log(err.response);
                });
            }}
          >
            Like
          </button>
        )}
      </div>
    </>
  );
}
