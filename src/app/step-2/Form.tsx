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
});

export function Form() {
  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof formTemplate>
  >({
    resolver: zodResolver(formTemplate),
  });
  console.log(formState.errors);

  const router = useRouter();
  const onSubmit: Parameters<typeof handleSubmit>[0] = (d) => {
    console.log("wah?");
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
      <FormSubmit type="submit" isLoading={isLoading}>
        Next
      </FormSubmit>
    </form>
  );
}
