import { AiInteraction } from "./AiInteraction";
import { redirectCheck } from "@/redirectCheck";
import { getUserQuestion, topicsPage1 } from "@/randomQuestions";

export default async function AiLookup() {
  await redirectCheck();
  const result = await getUserQuestion(0);
  return (
    <AiInteraction
      topic={topicsPage1[result.question].topic}
      submitUrl="/step-3/api"
      aiStep={3}
    />
  );
}
