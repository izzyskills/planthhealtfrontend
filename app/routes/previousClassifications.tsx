import PreviousClassificationsPage from "~/pages/PreviousPredictionsPage";
import type { Route } from "./+types/previousClassifications";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Historu" },
    { name: "description", content: "previous classifications" },
  ];
}

export default function Classify() {
  return <PreviousClassificationsPage />;
}
