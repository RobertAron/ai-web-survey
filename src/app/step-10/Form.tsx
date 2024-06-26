"use client";
import { FormSubmit } from "@/CommonComponents";
import { OnAScale } from "@/OnAScale";
import { useAsyncAction } from "@/useAsyncAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formTemplate = z.object({
  knowledge: z.record(z.string()),
  agree: z.record(z.string()),
  helpful: z.record(z.string()),
  experience: z.record(z.string()),
});

export function Form() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<z.infer<typeof formTemplate>>({
    resolver: zodResolver(formTemplate),
  });
  const onSubmit: Parameters<typeof handleSubmit>[0] = async (d) =>
    fetch("/step-10/api", {
      method: "POST",
      body: JSON.stringify(d),
    })
      .then((res) => res.json())
      .then((res) => router.push(res.nextPage));
  const { execute, isLoading } = useAsyncAction(onSubmit, {
    keepLoadingOnSuccess: true,
  });
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(execute)}>
      <OnAScale
        register={register}
        sectionKey="agree"
        responses={[
          "Definitely No",
          "Likely No",
          "Likely Yes",
          "Definitely Yes",
        ]}
        statements={[
          {
            id: "group-1-1",
            label:
              "Overall, do you feel like the AI models you interacted with could aid humans in researching topics?",
          },
          {
            id: "group-1-2",
            label:
              "Do you feel like the AI models you interacted with were biased in any way?",
          },
        ]}
      />
      <OnAScale
        register={register}
        sectionKey="helpful"
        responses={["None", "Less than half", "More than half", "Most of them"]}
        statements={[
          {
            id: "group-2-1",
            label:
              "How many of the comments made by the AI models did you disagree with?",
          },
          {
            id: "group-2-2",
            label:
              "How many of the comments made by the AI models did you think were incorrect?",
          },
        ]}
      />
      <OnAScale
        register={register}
        sectionKey="knowledge"
        responses={[
          "I don't know anything about them",
          "I know a little",
          "I know more than most",
          "I know a lot",
        ]}
        statements={[
          {
            id: "group-3-1",
            label:
              "Compared to the general public, how knowledgeable are you with AI models?",
          },
        ]}
      />
      <OnAScale
        register={register}
        sectionKey="experience"
        statements={[
          {
            id: "group-4-1",
            label:
              "How often do you interact with modern AI language models (such as ChatGPT, BingAI, Google Bard, etc.)?",
          },
        ]}
        responses={[
          "Daily",
          "Only 2-3 times a week",
          "Only once a week",
          "Only 2-3 times a month",
          "Once a month or less",
          "Never use",
        ]}
      />
      <FormSubmit type="submit" isLoading={isLoading}>
        Next
      </FormSubmit>
    </form>
  );
}
