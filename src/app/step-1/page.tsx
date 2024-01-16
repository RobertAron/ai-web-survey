import { Main, PageTitle } from "@/CommonComponents";
import { Form } from "./Form";
import { redirectCheck } from "@/redirectCheck";

export default async function DemographicSurvey() {
  const redirect = await redirectCheck();
  if (redirect !== null) return redirect;
  return (
    <Main>
      <PageTitle
        title="Demographic Form"
        subtitle="Please fill in the form below with your information. All fields are
        required."
      />
      <Form />
    </Main>
  );
}
