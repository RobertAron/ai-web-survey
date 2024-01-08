import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { OnAScale } from "@/OnAScale";
import { Main, MyLink, PageTitle } from "@/CommonComponents";

export default function Component() {
  return (
    <Main>
      <PageTitle
        title="Rate Your Knowledge"
        subtitle="Please rate your knowledge on the following topics."
      />
      <form className="space-y-4">
        <OnAScale
          responses={[
            "Never Heard of this",
            "No Knowledge",
            "Some Knowledge",
            "Very Knowledgeable",
          ]}
          statements={[
            "Covenant Marriages",
            "Astrology",
            "Sou Vie",
            "Net Neutraility",
            "Gambling",
            "Alients",
            "School Vouchers",
            "Coral Reefs",
            "Vacuum Coffee Making",
          ]}
        />
        <MyLink href="/step-3">
          Next
        </MyLink>
      </form>
    </Main>
  );
}
