import { Main, PageTitle } from "@/CommonComponents";
import { redirectCheck } from "@/redirectCheck";
import { Form } from "./Form";
import { getUserQuestion, topics } from "@/randomQuestions";

export function PostSurveyMaker(currentStep: string, questionIndex: number) {
  return async function Page() {
    await redirectCheck();
    const res = await getUserQuestion(questionIndex);
    return (
      <Main>
        <PageTitle
          title="Post-Research Survey"
          subtitle="Please answer the following questions to the best of your ability."
        />
        <Form currentStep={currentStep} topic={topics[res.question]} />
      </Main>
    );
  };
}
