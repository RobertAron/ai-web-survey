"use client";
import { FormSubmit, MyLink } from "@/CommonComponents";
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
  const { register, handleSubmit } = useForm<z.infer<typeof formTemplate>>({
    resolver: zodResolver(formTemplate),
  });

  const router = useRouter();
  const onSubmit = handleSubmit((d) => {
    fetch("/step-2/api", { method: "POST", body: JSON.stringify(d) })
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
        sectionKey="knowledgeRating"
        responses={[
          "Never Heard of this",
          "No Knowledge",
          "Some Knowledge",
          "Very Knowledgeable",
        ]}
        statements={
          [
            { id: "step-2-1", label: "Covenant Marriages" },
            { id: "step-2-2", label: "Astrology" },
            { id: "step-2-3", label: "Sou Vie" },
            { id: "step-2-4", label: "Net Neutraility" },
            { id: "step-2-5", label: "Gambling" },
            { id: "step-2-6", label: "Alients" },
            { id: "step-2-7", label: "School Vouchers" },
            { id: "step-2-8", label: "Coral Reefs" },
            { id: "step-2-9", label: "Vacuum Coffee Making" },
          ] as const
        }
      />
      <FormSubmit type="submit" isLoading={isLoading}>
        Next
      </FormSubmit>
    </form>
  );
}
