import { Main, PageTitle } from "@/CommonComponents";
import { Form } from "./Form";
import { redirectCheck } from "@/redirectCheck";

export default async function Component() {
  await redirectCheck();
  return (
    <Main>
      <PageTitle
        title="Rate the AI"
        subtitle="Rate how the AI did in the previous questions"
      />
      <Form />
    </Main>
  );
}
