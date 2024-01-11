import { OnAScale } from "@/OnAScale";
import { Main, MyLink, PageTitle } from "@/CommonComponents";

export default function Component() {
  return (
    <Main>
      <PageTitle
        title="Rate the AI"
        subtitle="Rate how the AI did in the previous questions"
      />
      <form className="space-y-4">
        <OnAScale
          responses={[
            "Not helpful",
            "Slightly helpful",
            "Helpful",
            "Extremely helpful",
          ]}
          statements={[
            "How helpful was the AI model in assisting with Task 2?",
          ]}
        />
        <MyLink href="/step-10">Next</MyLink>
      </form>
    </Main>
  );
}
