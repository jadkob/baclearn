import * as jwt from "jsonwebtoken";
import { Course } from "../../model/course";
import { User } from "../../model/user";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token || !(await jwt.verify(token, process.env.JWT_SECRET!)))
      return new Response("Unauthorized", { status: 401 });

    const decoded: any = jwt.decode(token);

    const courses = await Course.find({ watchedUsers: { $in: decoded.id } });
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
