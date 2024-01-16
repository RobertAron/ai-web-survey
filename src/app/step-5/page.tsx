import { Main, PageTitle } from "@/CommonComponents";
import { Form } from "./Form";
import { redirectCheck } from "@/redirectCheck";

export default async function Component() {
  await redirectCheck();
  return (
    <Main>
      <PageTitle
        title="Engage & Learn: Interactive Chatbot"
        subtitle="Learn about a topic from the chatbot."
      />
      <Form />
    </Main>
  );
}
