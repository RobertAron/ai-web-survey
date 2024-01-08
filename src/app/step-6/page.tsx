import { Main, MyLink, PageTitle } from "@/CommonComponents";
import { OnAScale } from "@/OnAScale";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Page() {
  return (
    <Main>
      <PageTitle
        title="Rate Your Knowledge"
        subtitle="Please rate your knowledge on the following topics."
      />
      <form className="flex flex-col gap-4">
        <OnAScale
          responses={[
            "Never Heard of this",
            "No Knowledge",
            "Some Knowledge",
            "Very Knowledgeable",
          ]}
          statements={["Covenant Marriages"]}
        />
        <OnAScale
          responses={[
            "Strongly Disagree",
            "Disagree",
            "Moderately Disagree",
            "Moderately Agree",
            "Agree",
            "Strongly Agree",
          ]}
          statements={[
            "I believe all states in the United States should offer covenant marriages.",
          ]}
        />
        <OnAScale
          responses={[
            "Not helpful",
            "Slightly helpful",
            "Helpful",
            "Extremely Helpful",
          ]}
          statements={["The AI was helpful in assisting with Task 1."]}
        />
      </form>
      <MyLink href="/step-7">
        Next
      </MyLink>
    </Main>
  );
}
