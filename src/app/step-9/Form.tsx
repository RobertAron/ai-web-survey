"use client";

import { OnAScale } from "@/OnAScale";
import { FormSubmit } from "@/CommonComponents";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAsyncAction } from "@/useAsyncAction";

const formTemplate = z.object({
  agreeRating: z.record(z.string()),
});

export function Form() {
  const { register, handleSubmit } = useForm<z.infer<typeof formTemplate>>({
    resolver: zodResolver(formTemplate),
  });
  const router = useRouter();
  const onSubmit = handleSubmit((d) => {
    fetch("/step-9/api", { method: "POST", body: JSON.stringify(d) })
      .then((res) => res.json())
      .then((res) => router.push(res.nextPage));
  });
  const { execute, isLoading } = useAsyncAction(onSubmit, {
    keepLoadingOnSuccess: true,
  });
  return (
    <form className="space-y-4" onSubmit={execute}>
      <OnAScale
        register={register}
        sectionKey="agreeRating"
        responses={[
          "Not helpful",
          "Slightly helpful",
          "Helpful",
          "Extremely helpful",
        ]}
        statements={[
          {
            id: "step-9-1",
            label: "How helpful was the AI model in assisting with Task 2?",
          },
        ]}
      />
      <FormSubmit type="submit" isLoading={isLoading}>Next</FormSubmit>
    </form>
  );
}
