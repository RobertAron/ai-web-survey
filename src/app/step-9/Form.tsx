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
});

export function Form() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<z.infer<typeof formTemplate>>({
    resolver: zodResolver(formTemplate),
  });
  const onSubmit: Parameters<typeof handleSubmit>[0] = async (d) =>
    fetch("/step-9/api", {
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
          "Definietly No",
          "Likely No",
          "Likely Yes",
          "Definietly Yes",
        ]}
        statements={[
          {
            id: "group-1-1",
            label:
              "Overall, do you feel like the AI models could aid humans in researching opinions?",
          },
          {
            id: "group-1-2",
            label: "Do you feel like the model was bias in any way?",
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
              "Was there any comments the AI model made that you did not agree with?",
          },
          {
            id: "group-2-2",
            label:
              "Was there any information the AI model presented that you thought was incorrect?",
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
      <FormSubmit type="submit" isLoading={isLoading}>
        Next
      </FormSubmit>
    </form>
  );
}
