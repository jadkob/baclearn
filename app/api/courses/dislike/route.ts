import * as jwt from "jsonwebtoken";
import { Course } from "../../model/course";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token || !(await jwt.verify(token, process.env.JWT_SECRET!)))
      return new Response("Unauthorized", { status: 401 });

    const decoded: any = jwt.decode(token);

    const { courseId } = await req.json();

    const course = await Course.findById(courseId);

    if (!course) return new Response("Course not found", { status: 404 });

    if (!course?.likedUsers.includes(decoded.id))
      return new Response("You have not liked this course", {
        status: 400,
      });

    course?.likedUsers.splice(course.likedUsers.indexOf(decoded.id), 1);
    course.likes -= 1;

    await course.save();

    return Response.json(course);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
