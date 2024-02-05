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
  const onSubmit: Parameters<typeof handleSubmit>[0] = async (d) =>
    fetch("/step-10/api", { method: "POST", body: JSON.stringify(d) })
      .then((res) => res.json())
      .then((res) => router.push(res.nextPage));
  const { execute, isLoading } = useAsyncAction(onSubmit, {
    keepLoadingOnSuccess: true,
  });
  return (
    <form className="space-y-4" onSubmit={handleSubmit(execute)}>
      <OnAScale
        register={register}
        sectionKey="agreeRating"
        responses={["Strongly Disagree", "Disagree", "Agree", "Strongly Agree"]}
        statements={[
          {
            id: "group-1-1",
            label:
              "If economic globalisation is inevitable, it should primarly serve humanity rather than the interests of trans-national corporations",
          },
          {
            id: "group-1-2",
            label:
              "I'd always support my country, whether it was right or wrong.",
          },
          {
            id: "group-1-3",
            label:
              "No one chooses their country of birth, so it's foolish to be proud of it.",
          },
        ]}
      />
      <FormSubmit type="submit" isLoading={isLoading}>
        Next
      </FormSubmit>
    </form>
  );
}
