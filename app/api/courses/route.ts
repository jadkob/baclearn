import * as jwt from "jsonwebtoken";
import { Course } from "../model/course";
import { User } from "../model/user";
import { isEmpty } from "../isEmpty";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token || !(await jwt.verify(token, process.env.JWT_SECRET!)))
      return new Response("Unauthorized", { status: 401 });

    const decoded: any = jwt.decode(token);

    const courses = await Course.find({ watchedUsers: { $nin: decoded.id } });
    const user = await User.findById(decoded.id);

    if (courses.length === 0) {
      if (
        Array.isArray(user?.watchedCourses) &&
        user?.watchedCourses.length > 0
      ) {
        return new Response("You have Watched All Courses", { status: 404 });
      } else {
        return new Response("No Courses Available", { status: 404 });
      }
    }
    return Response.json(courses);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token || !(await jwt.verify(token, process.env.JWT_SECRET!)))
      return new Response("Unauthorized", { status: 401 });

    const decoded: any = jwt.decode(token);
    const { name, description, ytLink } = await req.json();

    if (
      !name ||
      !description ||
      !ytLink ||
      isEmpty([name, description, ytLink])
    )
      return new Response("Missing Fields", { status: 400 });

    const course = new Course({ name, description, ytLink });

    const user = await User.findById(decoded.id);

    user?.watchedCourses.push(course._id);
    await user?.save();
    await course.save();

    return Response.json(course);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
