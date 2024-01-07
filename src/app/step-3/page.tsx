import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { OnAScale } from "@/OnAScale";

export default function Component() {
  return (
    <main className="flex flex-col gap-2 p-2">
      <h2 className="text-2xl font-bold">Rate Your Knowledge</h2>
      <p className="text-gray-500 dark:text-gray-400">
        Please rate your knowledge on the following topics.
      </p>
      <form>
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
        <Link href="/step-4" className={cn(buttonVariants(), "w-full m-auto")}>
          Next
        </Link>
      </form>
    </main>
  );
}
