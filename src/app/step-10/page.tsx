import { Main, PageTitle } from "@/CommonComponents";
import { Form } from "./Form";
import { getUserId, getWarningMessage, redirectCheck } from "@/redirectCheck";

export default async function Component() {
  await redirectCheck();
  const userId = await getUserId();
  if (userId === null) throw new Error("Failed to get userId");
  const warningMessage = await getWarningMessage(userId);
  return (
    <Main>
      <PageTitle
        title="Opinion of the AI Model"
        subtitle="In the questions below the 'AI models' refer to the AI language models that you interacted with in the previous tasks."
      />
      <Form warningMessage={warningMessage} />
    </Main>
  );
}
