import { OnAScale } from "@/OnAScale";
import { Main, MyLink, PageTitle } from "@/CommonComponents";

export default function Component() {
  return (
    <Main>
      <PageTitle
        title="Opinion of the AI Model"
        subtitle="Rate how the AI did in the previous questions"
      />
      <form className="space-y-4">
        <OnAScale
          responses={[
            "Definietly No",
            "Likely No",
            "Likely Yes",
            "Definietly Yes",
          ]}
          statements={[
            "Overall, do you feel like the AI models could aid humans in researching opinions?",
            "Do you feel like the model was bias in any way?",
          ]}
        />
        <OnAScale
          responses={[
            "None",
            "Less than half",
            "More than half",
            "Most of them",
          ]}
          statements={[
            "Was there any comments the AI model made that you did not agree with?",
            "Was there any information the AI model presented that you thought was incorrect?",
          ]}
        />
        <OnAScale
          responses={[
            "I don't know anything about them",
            "I know a little",
            "I know more than most",
            "I know a lot",
          ]}
          statements={[
            "Compared to the general public, how knowledgeable are you with AI models?",
          ]}
        />
        <MyLink href="/step-11">Next</MyLink>
      </form>
    </Main>
  );
}
