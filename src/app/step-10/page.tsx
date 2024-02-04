import { Main, PageTitle } from "@/CommonComponents";
import { Form } from "./Form";
import { redirectCheck } from "@/redirectCheck";

export default async function Component() {
  await redirectCheck();
  return (
    <Main>
      <PageTitle
        title="Political Opinions"
        subtitle="Please answer the following questions"
      />
      <Form />
    </Main>
  );
}
