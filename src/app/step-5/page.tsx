import { AiInteraction } from "../step-3/AiInteraction";

export default async function AiLookup() {
  return <AiInteraction topic="Dune" submitUrl="/step-5/api" />;
}
