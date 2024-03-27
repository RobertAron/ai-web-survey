"use client";
import { FormSubmit } from "@/CommonComponents";
import { OnAScale } from "@/OnAScale";
import { useAsyncAction } from "@/useAsyncAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formTemplate = z.object({
  knowledgeRating: z.record(z.string()),
  agreeRating: z.record(z.string()),
});

export function Form() {
  const { register, handleSubmit } = useForm<
    z.infer<typeof formTemplate>
  >({
    resolver: zodResolver(formTemplate),
  });

  const router = useRouter();
  const onSubmit: Parameters<typeof handleSubmit>[0] = (d) => {
    return fetch("/step-2/api", { method: "POST", body: JSON.stringify(d) })
      .then((res) => res.json())
      .then((res) => router.push(res.nextPage));
  };

  const { execute, isLoading } = useAsyncAction(onSubmit, {
    keepLoadingOnSuccess: true,
  });
  return (
    <form className="space-y-4" onSubmit={handleSubmit(execute)}>
      <OnAScale
        register={register}
        sectionKey="knowledgeRating"
        responses={[
          "Never Heard of this",
          "No Knowledge",
          "Some Knowledge",
          "Very Knowledgeable",
        ]}
        statements={
          [
            { id: "q-1", label: "Covenant Marriages" },
            { id: "q-2", label: "Net Neutraility" },
          ] as const
        }
      />
      <OnAScale
        register={register}
        sectionKey="agreeRating"
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
            id: "q-3",
            label:
              "I believe all states in the United States should offer covenant marriages.",
          },
          {
            id: "q-4",
            label: "I believe that net neutrality is a good thing for society.",
          },
        ]}
      />
      <FormSubmit type="submit" isLoading={isLoading}>
        Next
      </FormSubmit>
    </form>
  );
}
