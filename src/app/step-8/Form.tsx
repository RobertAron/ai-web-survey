"use client";
import { Chatbox } from "@/Chatbox";
import { FormSubmit } from "@/CommonComponents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAsyncAction } from "@/useAsyncAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChat } from "ai/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formTemplate = z.object({
  education: z.number(),
  safety: z.number(),
  welfare: z.number(),
  veterans: z.number(),
});

export function Form() {
  const router = useRouter();
  const useChatHelpers = useChat({
    api: "/step-8/api/ai",
  });
  const { register, handleSubmit, watch } = useForm<
    z.infer<typeof formTemplate>
  >({
    resolver: zodResolver(formTemplate),
    defaultValues: {
      education: 0,
      safety: 0,
      welfare: 0,
      veterans: 0,
    },
  });
  const current = watch();
  const [lastEvaluate, setLastEvaluate] = useState<z.infer<
    typeof formTemplate
  > | null>(null);
  const canSubmit = JSON.stringify(lastEvaluate) === JSON.stringify(current);
  const remaining =
    100 - Object.values(current).reduce((acc, next) => next + acc);
  const onEvaluate: Parameters<typeof handleSubmit>[0] = async (d) => {
    if (remaining !== 0) {
      console.log("remaining must be 0");
      return;
    }
    setLastEvaluate(d);
    useChatHelpers.append({
      role: "user",
      content: JSON.stringify(d),
    });
  };
  const onSubmit: Parameters<typeof handleSubmit>[0] = async (d) => {
    if (remaining !== 0) {
      console.log("remaining must be 0");
      return;
    }
    fetch("/step-8/api", {
      method: "POST",
      body: JSON.stringify({
        messages: useChatHelpers.messages,
        percentages: d,
      }),
    })
      .then((res) => res.json())
      .then((res) => router.push(res.nextPage));
  };

  const { execute, isLoading } = useAsyncAction(onSubmit, {
    keepLoadingOnSuccess: true,
  });
  return (
    <>
      <Chatbox
        useChatHelpers={useChatHelpers}
        topic="to get advice on allocation."
      >
        <form
          className="p-2 flex flex-col gap-2"
          onSubmit={handleSubmit(onEvaluate)}
        >
          <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-700">
            <label className="flex flex-col gap-1">
              <span>Public Safety</span>
              <Input
                className="w-full"
                max="100"
                min="0"
                type="number"
                {...register("safety", { valueAsNumber: true })}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span>K-12th Education</span>
              <Input
                className="w-full"
                max="100"
                min="0"
                type="number"
                {...register("education", { valueAsNumber: true })}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span>Welfare Assistance</span>
              <Input
                className="w-full"
                max="100"
                min="0"
                type="number"
                {...register("welfare", { valueAsNumber: true })}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span>Veteran Services</span>
              <Input
                className="w-full"
                max="100"
                min="0"
                type="number"
                {...register("veterans", { valueAsNumber: true })}
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
          <Button className="w-full">Evaluate Allocation</Button>
        </form>
      </Chatbox>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(execute)}>
        <FormSubmit
          type="submit"
          isLoading={isLoading}
          disabled={!canSubmit}
          className="bg-red-600"
        >
          Submit FINAL ALLOCATION
        </FormSubmit>
      </form>
    </>
  );
}
