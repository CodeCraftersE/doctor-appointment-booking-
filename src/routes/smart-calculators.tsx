import { createFileRoute } from "@tanstack/react-router";
import SmartHealthCalculators from "@/components/SmartHealthCalculators";

export const Route = createFileRoute("/smart-calculators")({
  component: SmartHealthCalculators,
});
