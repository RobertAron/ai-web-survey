import { Main, PageTitle } from "@/CommonComponents";
import { Form } from "./Form";
import { redirectCheck } from "@/redirectCheck";

export default async function DemographicSurvey() {
  const redirect = await redirectCheck();
  if (redirect !== null) return redirect;
  return (
    <Main>
      <PageTitle title="Question" />
      <Form />
    </Main>
  );
}
