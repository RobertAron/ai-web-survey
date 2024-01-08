import { Main, MyLink, PageTitle } from "@/CommonComponents";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Component() {
  return (
    <Main>
      <PageTitle
        title="AI Assisted Learning Instructions"
        subtitle="Please read the following instructions:"
      />
      <p>
        In order to learn more about each topic, we ask that you interact with a
        given modern AI language model. You will be required to have at least 5
        interactions with the model on each topic. However, you may do up to 20
        interactions. An interaction can be in the form of a question,
        statement, or request.
      </p>
      <p>
        After you feel like you have sufficiently researched the topic, we will
        again ask you to fill out a survey on your opinion and knowledge on the
        given topic.
      </p>
      <p>
        To illustrate how to use the AI language model, we provide the following
        pre-recorded interaction. The topic for this example is “American
        Football”.
      </p>
      <div className="relative w-full aspect-w-16 aspect-h-9 py-4">
        <video controls className="w-full bg-black" />
      </div>
      <MyLink href="/step-5">
        Next
      </MyLink>
    </Main>
  );
}
