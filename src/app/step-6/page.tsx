import { Main, PageTitle } from "@/CommonComponents";
import { redirectCheck } from "@/redirectCheck";
import { Form } from "./Form";

export default async function Page() {
  await redirectCheck();
  return (
    <Main>
      <PageTitle
        title="Post-Research Survey"
        subtitle="Please answer the following questions to the best of your ability."
      />
      <Form />
    </Main>
  );
}
