import Image from "next/image";

export default function Home() {
  return (
    <main
      className="h-screen w-screen bg-no-repeat bg-cover bg-center grid place-items-center"
      style={{ backgroundImage: "url(/bg2.png)" }}
    >
      <div className="bg-shark-50 p-16 rounded-2xl">
        <h1 className="text-4xl font-black">Get Started now</h1>
        <form action="" className="mt-2 flex flex-col gap-2">
          <label htmlFor="name" className="flex flex-col">
            Name
            <input
              type="text"
              name=""
              id=""
              className="rounded-md bg-shark-100 border-none focus-within:bg-shark-200"
            />
          </label>
          <label htmlFor="email" className="flex flex-col">
            Email address
            <input
              type="email"
              name=""
              id=""
              className="rounded-md bg-shark-100 border-none focus-within:bg-shark-200"
            />
          </label>
          <label htmlFor="password" className="flex flex-col">
            Password
            <input
              type="password"
              name=""
              id=""
              className="rounded-md bg-shark-100 border-none focus-within:bg-shark-200"
            />
          </label>
          <button
            className="bg-shark-500 text-shark-50 p-2 rounded-md mt-2"
            type="submit"
          >
            Sign up
          </button>
        </form>
      </div>
    </main>
  );
}
