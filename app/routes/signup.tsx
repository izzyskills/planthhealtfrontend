import type { JSX } from "react/jsx-runtime";
import type { Route } from "./+types/signup";
import { SignupForm } from "~/components/Forms/signup-form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SignUp" },
    { name: "description", content: "Signup for a nwe account" },
  ];
}

export default function Signup(): JSX.Element {
  return (
    <div className=" items-center flex flex-col justify-center md:justify-normal md:flex-row">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 py-6 sm:mt-12">
        <SignupForm />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <img
          src="/admin.png"
          alt="Admin Login Illustration"
          className="w-full md:block hidden"
        />
      </div>
    </div>
  );
}
