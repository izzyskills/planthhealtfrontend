import ClassifierPage from "~/pages/ClassiferPage";
import type { Route } from "./+types/classify";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Classify" },
    { name: "description", content: "Classify page" },
  ];
}

export default function Classify() {
  return <ClassifierPage />;
}
