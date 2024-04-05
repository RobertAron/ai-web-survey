import { Main, PageTitle } from "@/CommonComponents";
import { redirectCheck } from "@/redirectCheck";
import { Form } from "./Form";
import { getUserQuestion, topicsPage1 } from "@/randomQuestions";

export function PostSurveyQuestionMaker(
  currentStep: string,
  questionIndex: number
) {
  return async function Page() {
    await redirectCheck();
    const res = await getUserQuestion(questionIndex);
    return (
      <Main>
        <PageTitle
          title="Post-Research Survey"
          subtitle="Please answer the following questions to the best of your ability."
        />
        <Form
          currentStep={currentStep}
          topic={topicsPage1[res.question].topic}
          statement={topicsPage1[res.question].statement}
        />
      </Main>
    );
  };
}
