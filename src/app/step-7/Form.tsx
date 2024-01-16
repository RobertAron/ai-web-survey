"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { FormSubmit } from "@/CommonComponents";
import { cn } from "@/lib/utils";
const formTemplate = z.object({
  education: z.number(),
  health: z.number(),
  infrastructure: z.number(),
  publicSafety: z.number(),
  environment: z.number(),
});

export function Form() {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<
    z.infer<typeof formTemplate>
  >({
    resolver: zodResolver(formTemplate),
    defaultValues: {
      education: 0,
      health: 0,
      infrastructure: 0,
      publicSafety: 0,
      environment: 0,
    },
  });
  const current = watch();
  const remaining =
    100 - Object.values(current).reduce((acc, next) => next + acc);
  const onSubmit = handleSubmit((d) => {
    if (remaining !== 0) return;
    fetch("/step-7/api", { method: "POST", body: JSON.stringify(d) })
      .then((res) => res.json())
      .then((res) => router.push(res.nextPage));
  });
  return (
    <form
      className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-700"
      onSubmit={onSubmit}
    >
      <label className="flex flex-col gap-1">
        <span>Education</span>
        <Input
          className="w-full"
          max="100"
          min="0"
          type="number"
          {...register("education", { valueAsNumber: true })}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span>Health</span>
        <Input
          className="w-full"
          max="100"
          min="0"
          type="number"
          {...register("health", { valueAsNumber: true })}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span>Infrastructure</span>
        <Input
          className="w-full"
          max="100"
          min="0"
          type="number"
          {...register("infrastructure", { valueAsNumber: true })}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span>Public Safety</span>
        <Input
          className="w-full"
          max="100"
          min="0"
          type="number"
          {...register("publicSafety", { valueAsNumber: true })}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span>Environment</span>
        <Input
          className="w-full"
          max="100"
          min="0"
          type="number"
          {...register("environment", { valueAsNumber: true })}
        />
      </label>
      <div
        className={cn(
          "font-bold text-2xl self-end justify-self-end flex h-min",
          {
            "text-orange-500": remaining !== 0,
            "text-green-600": remaining === 0,
          }
        )}
      >
        {remaining} Remaining
      </div>
      <FormSubmit type="submit" className="col-span-2">
        Next
      </FormSubmit>
    </form>
  );
}
