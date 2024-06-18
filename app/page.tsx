import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome to baclearn!</h1>
            <p className="py-6">
              Youtube&apos;s best courses bundled into one platform.
            </p>
            <div className="flex gap-[5vh] justify-center">
              <button className="btn btn-primary">
                <Link href={"/login"}>LogIn</Link>
              </button>
              <button className="btn btn-primary">
                <Link href={"/signup"}>SignUp</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
