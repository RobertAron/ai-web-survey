import { Main, PageTitle } from "@/CommonComponents";
import { redirectCheck } from "@/redirectCheck";
import { Form } from "./Form";

export default async function Page() {
  await redirectCheck();
  return (
    <Main>
      <PageTitle
        title="Rate Your Knowledge"
        subtitle="Please rate your knowledge on the following topics."
      />
      <Form />
    </Main>
  );
}
