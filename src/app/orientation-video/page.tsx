import { redirectCheck } from "@/redirectCheck";
import { Form } from "./Form";
import { Main, PageTitle } from "@/CommonComponents";

export default async function Page() {
  await redirectCheck();
  return (
    <Main>
      <PageTitle
        title="Orientation"
        subtitle="Please complete the following orientation video to continue"
      />
      <Form />
    </Main>
  );
}
