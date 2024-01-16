import { Main, PageTitle } from "@/CommonComponents";
import { Form } from "./Form";
import { redirectCheck } from "@/redirectCheck";

export default async function Component() {
  await redirectCheck();
  return (
    <Main>
      <PageTitle
        title="Rate how much you agree"
        subtitle="Please rate how much you agree with the following statements"
      />
      <Form />
    </Main>
  );
}
