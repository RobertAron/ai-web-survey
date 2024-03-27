"use client";
import { FormSubmit } from "@/CommonComponents";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAsyncAction } from "@/useAsyncAction";

const schema = z.object({
  surveyId: z.string().min(1, { message: "Required" }),
});

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const onSubmit: Parameters<typeof handleSubmit>[0] = async (d) =>
    fetch("/api", {
      method: "POST",
      body: JSON.stringify({ userId: d.surveyId }),
    })
      .then((res) => res.json())
      .then((res) => router.push(res.nextPage));
  const { execute, isLoading } = useAsyncAction(onSubmit, {
    keepLoadingOnSuccess: true,
  });
  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(execute)}>
      <Input
        placeholder="Prolific ID"
        {...register("surveyId")}
        error={errors.surveyId?.message}
      />
      <FormSubmit type="submit" isLoading={isLoading}>
        Consent & Continue
      </FormSubmit>
    </form>
  );
}
