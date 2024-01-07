import { OnAScale } from "@/OnAScale";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col gap-2 p-2">
      <h2 className="text-2xl font-bold">Rate Your Knowledge</h2>
      <p className="text-gray-500 dark:text-gray-400">
        Please rate your knowledge on the following topics.
      </p>
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
            "I believe all states in the United States should offfer covenant marriages.",
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
      <Link href="/step-7" className={cn(buttonVariants(), "w-full mx-auto")}>
        Next
      </Link>
    </main>
  );
}
