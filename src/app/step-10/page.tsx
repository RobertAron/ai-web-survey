import { Main, PageTitle } from "@/CommonComponents";
import { Form } from "./Form";
import { redirectCheck } from "@/redirectCheck";

export default async function Component() {
  await redirectCheck();
  return (
    <Main>
      <PageTitle
        title="Opinion of the AI Model"
        subtitle="In the questions below the 'AI models' refer to the AI language models that you interacted with in the previous tasks."
      />
      <Form />
    </Main>
  );
}
