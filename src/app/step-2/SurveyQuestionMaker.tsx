import { Main, PageTitle } from "@/CommonComponents";
import { redirectCheck } from "@/redirectCheck";
import { Form } from "./Form";
import { getUserQuestion, topicsPage1, topicsPage2 } from "@/randomQuestions";

export function PreSurveyQuestionMaker(
  currentStep: string,
  questionIndex: number
) {
  return async function Page() {
    await redirectCheck();
    const res = await getUserQuestion(questionIndex);
    const topic = questionIndex === 0 ? topicsPage1 : topicsPage2;

    return (
      <Main>
        <PageTitle
          title="Pre-Research Survey"
          subtitle="Please answer the following questions to the best of your ability."
        />
        <Form
          currentStep={currentStep}
          topic={topic[res.question].topic}
          statement={topic[res.question].statement}
        />
      </Main>
    );
  };
}
