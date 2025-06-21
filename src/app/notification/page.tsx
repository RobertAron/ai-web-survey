import { Main, PageTitle } from "@/CommonComponents";
import { Form } from "./Form";
import { redirectCheck } from "@/redirectCheck";

export default async function DemographicSurvey() {
  const redirect = await redirectCheck();
  if (redirect !== null) return redirect;
  return (
    <Main>
      <PageTitle title="ATTENTION" />
      <p className="text-lg">
        On the following page,{" "}
        <span className="font-extrabold">
          ignore the instructions and select `NO`
        </span>
      </p>
      <Form />
    </Main>
  );
}
