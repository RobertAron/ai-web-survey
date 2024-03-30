import { AiInteraction } from "./AiInteraction";
import { redirectCheck } from "@/redirectCheck";
import { getUserQuestion, topics } from "@/randomQuestions";

export default async function AiLookup() {
  await redirectCheck();
  const result = await getUserQuestion(0);
  return (
    <AiInteraction
      topic={topics[result.question].topic}
      submitUrl="/step-3/api"
    />
  );
}
