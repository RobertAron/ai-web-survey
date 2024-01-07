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
        <Link href="/step-3" className={cn(buttonVariants(), "w-full m-auto")}>
          Next
        </Link>
      </form>
    </main>
  );
}
