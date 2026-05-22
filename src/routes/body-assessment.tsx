import { createFileRoute } from "@tanstack/react-router";
import BodyAssessment from "@/components/BodyAssessment";

export const Route = createFileRoute("/body-assessment")({
  component: BodyAssessment,
});
