"use client";
import { FormSubmit } from "@/CommonComponents";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

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
  const onSubmit = handleSubmit(async (data) => {
    console.log("hello world!");
    console.log(data);
    fetch("/api", {
      method: "POST",
      body: JSON.stringify({ userId: data.surveyId }),
    })
      .then((res) => res.json())
      .then((res) => router.push(res.nextPage));
  });
  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmit}>
      <Input
        placeholder="Survey ID"
        {...register("surveyId")}
        error={errors.surveyId?.message}
      />
      <FormSubmit type="submit">Consent & Continue</FormSubmit>
    </form>
  );
}
