import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Login to your account." },
  ];
}

export default function Login() {
  return <h1>Login</h1>;
}
