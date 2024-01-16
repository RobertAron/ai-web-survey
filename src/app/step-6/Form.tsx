"use client";
import { FormSubmit } from "@/CommonComponents";
import { OnAScale } from "@/OnAScale";
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
  const onSubmit = handleSubmit((d) => {
    fetch("/step-6/api", {
      method: "POST",
      body: JSON.stringify(d),
    })
      .then((res) => res.json())
      .then((res) => router.push(res.nextPage));
  });
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <OnAScale
        register={register}
        sectionKey="knowledge"
        responses={[
          "Never Heard of this",
          "No Knowledge",
          "Some Knowledge",
          "Very Knowledgeable",
        ]}
        statements={[{ id: "step-6-1-1", label: "Covenant Marriages" }]}
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
            id: "step-6-2-1",
            label:
              "I believe all states in the United States should offer covenant marriages.",
          },
        ]}
      />
      <OnAScale
        register={register}
        sectionKey="helpful"
        responses={[
          "Not helpful",
          "Slightly helpful",
          "Helpful",
          "Extremely Helpful",
        ]}
        statements={[
          {
            id: "step-6-3-1",
            label: "The AI was helpful in assisting with Task 1.",
          },
        ]}
      />
      <FormSubmit type="submit">Next</FormSubmit>
    </form>
  );
}
