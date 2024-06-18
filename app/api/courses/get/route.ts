import * as jwt from "jsonwebtoken";
import { Course } from "../../model/course";
import { User } from "../../model/user";

export async function POST(req: Request) {
  try {
    const authheader = req.headers.get("Authorization");
    const token = authheader?.split(" ")[1];

    if (!token || !(await jwt.verify(token, process.env.JWT_SECRET!)))
      return new Response("Unauthorized", { status: 401 });
    const decoded: any = jwt.decode(token);

    const { courseId } = await req.json();

    const course = await Course.findById(courseId);

    if (!course) return new Response("Course not found", { status: 404 });

    const user = await User.findById(decoded.id);

    if (!user) return new Response("User not found", { status: 404 });

    if (!user.watchedCourses.includes(courseId))
      user.watchedCourses.push(courseId);

    if (!course.watchedUsers.includes(user._id as any))
      course.watchedUsers.push(user._id as any);

    await course.save();
    await user.save();

    return Response.json(course);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
