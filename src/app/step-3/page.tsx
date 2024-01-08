import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { OnAScale } from "@/OnAScale";
import { Main, MyLink, PageTitle } from "@/CommonComponents";

export default function Component() {
  return (
    <Main>
      <PageTitle
        title="Rate how much you agree"
        subtitle="Please rate how much you agree with the following statements"
      />
      <form className="space-y-4">
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
            "I believe all states in the United States should offfer covenant marriages.",
            "I believe in astrology.",
            "I believe that sou vie is the best way to cook a steak.",
            "I believe that net neutrality is a good thing for society.",
            "I believe gambling should be legal.",
            "I believe aliens, in some form, exist.",
            "I believe school vouchers are a right of country's citizens.",
            "I believe the coral reefs will be gone in the next 100 years.",
            "I believe vacuum coffee makers is the best way to make an espresso.",
          ]}
        />
        <MyLink href="/step-4">
          Next
        </MyLink>
      </form>
    </Main>
  );
}
