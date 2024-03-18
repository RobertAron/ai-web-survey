import { AiInteraction } from "../step-4/AiInteraction";
import { redirectCheck } from "@/redirectCheck";
import { getUserQuestion, topics } from "@/randomQuestions";

export default async function AiLookup() {
  await redirectCheck();
  const result = await getUserQuestion(1);
  return (
    <AiInteraction topic={topics[result.question].topic} submitUrl="/step-7/api" />
  );
}
