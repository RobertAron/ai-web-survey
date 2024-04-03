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
          "Never Heard of This",
          "No Knowledge",
          "Some Knowledge",
          "Very Knowledgeable",
        ]}
        statements={[
          {
            id: "group-1-1",
            label: `How knowledgeable are you on this topic: ${topic}?`,
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
            label: `How much do you agree with the following: ${statement}`,
          },
        ]}
      />
      <FormSubmit type="submit" isLoading={isLoading}>
        Next
      </FormSubmit>
    </form>
  );
}
