import { Main, PageTitle } from "@/CommonComponents";
import { redirectCheck } from "@/redirectCheck";
import { Form } from "./Form";

export function PostSurveyMaker(currentStep: string, topic: string) {
  return async function Page() {
    await redirectCheck();
    return (
      <Main>
        <PageTitle
          title="Post-Research Survey"
          subtitle="Please answer the following questions to the best of your ability."
        />
        <Form currentStep={currentStep} topic={topic} />
      </Main>
    );
  };
}
const PAGE = PostSurveyMaker("step-4", "Dune");
export default PAGE;
