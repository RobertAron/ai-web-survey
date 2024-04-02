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
});

export function Form({
  currentStep,
  topic,
  statement,
}: {
  currentStep: string;
  topic: string;
  statement: string;
}) {
  const router = useRouter();
  const { register, handleSubmit } = useForm<z.infer<typeof formTemplate>>({
    resolver: zodResolver(formTemplate),
  });
  const onSubmit: Parameters<typeof handleSubmit>[0] = async (d) =>
    fetch(`/${currentStep}/api`, {
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
        sectionKey="knowledge"
        responses={[
          "Never Heard of this",
          "No Knowledge",
          "Some Knowledge",
          "Very Knowledgeable",
        ]}
        statements={[
          {
            id: "group-1-1",
            label: (<span>How knowledgeable are you on this topic: <u>{topic}</u>?</span>).toString(),
          },
        ]}
      />
      <OnAScale
        register={register}
        sectionKey="agree"
        responses={[
          "Strongly Disagree",
          "Disagree",
          "Moderately Disagree",
          "Moderately Agree",
          "Agree",
          "Strongly Agree",
        ]}
        statements={[
          {
            id: "group-2-1",
            label: (<span>How much do you agree with the following: <u>{statement}</u></span>).toString(),
          },
          {
            id: "group-2-2",
            label: (<span>How much do you agree with the following: <u>The AI was helpful in learning about the topic.</u></span>).toString(),
          },
        ]}
      />
      <FormSubmit type="submit" isLoading={isLoading}>
        Next
      </FormSubmit>
    </form>
  );
}
