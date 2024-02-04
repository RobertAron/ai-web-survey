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
    fetch("/step-3/api", { method: "POST", body: JSON.stringify(d) })
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
          "Strongly Disagree",
          "Disagree",
          "Moderately Disagree",
          "Moderately Agree",
          "Agree",
          "Strongly Agree",
        ]}
        statements={[
          {
            id: "step-3-1",
            label:
              "I believe all states in the United States should offfer covenant marriages.",
          },
          { id: "step-3-2", label: "I believe in astrology." },
          {
            id: "step-3-3",
            label: "I believe that sou vie is the best way to cook a steak.",
          },
          {
            id: "step-3-4",
            label: "I believe that net neutrality is a good thing for society.",
          },
          { id: "step-3-5", label: "I believe gambling should be legal." },
          { id: "step-3-6", label: "I believe aliens, in some form, exist." },
          {
            id: "step-3-7",
            label:
              "I believe school vouchers are a right of country's citizens.",
          },
          {
            id: "step-3-8",
            label:
              "I believe the coral reefs will be gone in the next 100 years.",
          },
          {
            id: "step-3-9",
            label:
              "I believe vacuum coffee makers is the best way to make an espresso.",
          },
        ]}
      />
      <FormSubmit type="submit" isLoading={isLoading}>
        Next
      </FormSubmit>
    </form>
  );
}
