"use client";
import { Chatbox } from "@/Chatbox";
import { FormSubmit } from "@/CommonComponents";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAsyncAction } from "@/useAsyncAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChat } from "ai/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formTemplate = z.object({
  education: z.number(),
  health: z.number(),
  infrastructure: z.number(),
  publicSafety: z.number(),
  environment: z.number(),
});

export function Form() {
  const router = useRouter();
  const useChatHelpers = useChat({
    api: "/api/ai",
  });
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
    fetch("/step-8/api", {
      method: "POST",
      body: JSON.stringify({
        messages: useChatHelpers.messages,
        percentages: d,
      }),
    })
      .then((res) => res.json())
      .then((res) => router.push(res.nextPage));
  });
  const { execute, isLoading } = useAsyncAction(onSubmit, {
    keepLoadingOnSuccess: true,
  });
  return (
    <>
      <Chatbox useChatHelpers={useChatHelpers} />
      <form className="flex flex-col gap-2" onSubmit={execute}>
        <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-700">
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
        </div>
        <FormSubmit type="submit" isLoading={isLoading}>
          Next
        </FormSubmit>
      </form>
    </>
  );
}
