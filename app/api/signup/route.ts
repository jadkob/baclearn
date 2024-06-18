import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { isEmpty } from "../isEmpty";
import { User } from "../model/user";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password || isEmpty([username, password]))
      return new Response("Missing fields", { status: 400 });

    const user = await User.findOne({ username });
    if (user) return new Response("User already exists", { status: 400 });

    const newUser = new User({
      username,
      password: await bcrypt.hash(password, 10),
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, username },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    return Response.json({ token });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
