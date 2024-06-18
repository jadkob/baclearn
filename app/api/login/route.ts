import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { isEmpty } from "../isEmpty";
import { User } from "../model/user";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password || isEmpty([username, password]))
      return new Response("Missing Fields", { status: 400 });

    const user = await User.findOne({ username });
    if (!user) return new Response("User not found", { status: 400 });

    if (!(await bcrypt.compare(password, user.password as string)))
      return new Response("Invalid Credentials", { status: 400 });

    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET!);
    return Response.json({ token });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
