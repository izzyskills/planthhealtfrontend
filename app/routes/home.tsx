import LandingPage from "~/pages/LandingPage";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Plant Health" },
    { name: "description", content: "welcome to page" },
  ];
}

export default function Home() {
  return <LandingPage />;
}
