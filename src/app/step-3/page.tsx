import { Main, PageTitle } from "@/CommonComponents";
import { Form } from "./Form";
import { redirectCheck } from "@/redirectCheck";

export default async function Component() {
  await redirectCheck();
  return (
    <Main>
      <PageTitle
        title="Rate your opinion."
        subtitle="Please rate your personal opinion on the following topics."
      />
      <Form />
    </Main>
  );
}
