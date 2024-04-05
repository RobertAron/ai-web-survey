import { AiInteraction } from "../step-3/AiInteraction";
import { redirectCheck } from "@/redirectCheck";
import { getUserQuestion, topicsPage2 } from "@/randomQuestions";

export default async function AiLookup() {
  await redirectCheck();
  const result = await getUserQuestion(1);
  console.log(result);
  return (
    <AiInteraction
      topic={topicsPage2[result.question].topic}
      submitUrl="/step-6/api"
      aiStep={6}
    />
  );
}
