import { AiInteraction } from "../step-3/AiInteraction";
import { getUserId, getWarningMessage, redirectCheck } from "@/redirectCheck";
import { getUserQuestion, topicsPage2 } from "@/randomQuestions";

export default async function AiLookup() {
  await redirectCheck();
  const result = await getUserQuestion(1);
  const userId = await getUserId();
  if (userId === null) throw new Error("Failed to get userId");
  const warningMessage = await getWarningMessage(userId);
  return (
    <AiInteraction
      topic={topicsPage2[result.question].topic}
      submitUrl="/step-6/api"
      aiStep={6}
      warningMessage={warningMessage}
    />
  );
}
