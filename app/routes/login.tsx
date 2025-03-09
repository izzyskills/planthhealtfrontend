import { LoginForm } from "~/components/Forms/login-form";
import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Login to your account." },
  ];
}

export default function Login() {
  return (
    <div className=" items-center flex flex-col justify-center md:justify-normal md:flex-row">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 py-6 sm:mt-12">
        <LoginForm />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <img
          src="/5464649_2853457.svg"
          alt="Login Illustration"
          className="w-full md:block hidden"
        />
      </div>
    </div>
  );
}
