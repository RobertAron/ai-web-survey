"use client";
import { Chatbox } from "@/Chatbox";
import { ChatboxDefaultInput } from "@/ChatboxDefaultInput";
import { FormSubmit } from "@/CommonComponents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAsyncAction } from "@/useAsyncAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChat } from "ai/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formTemplate = z.object({
  education: z.number(),
  safety: z.number(),
  welfare: z.number(),
  veterans: z.number(),
});
type AllocationFormValues = z.infer<typeof formTemplate>;
function AllocationForm({
  onSubmit,
  submitSlot,
  onCanSubmitChange,
}: {
  onSubmit: (values: AllocationFormValues) => void;
  submitSlot: React.ReactNode;
  onCanSubmitChange: (val: boolean) => void;
}) {
  const { register, handleSubmit, watch, formState } = useForm<
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
  console.log(formState.errors);
  const current = watch();
  const remaining =
    100 - Object.values(current).reduce((acc, next) => next + acc);
  const canSubmit = remaining === 0;
  const onEvaluate: Parameters<typeof handleSubmit>[0] = async (d) => {
    if (!canSubmit) {
      console.log("remaining must be 0");
      return;
    }
    onSubmit(d);
  };
  useEffect(() => {
    onCanSubmitChange(canSubmit);
  }, [canSubmit, onCanSubmitChange]);
  return (
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
          {Number(remaining.toFixed(2))} Remaining
        </div>
      </div>
      {submitSlot}
    </form>
  );
}

export function Form() {
  const router = useRouter();
  const useChatHelpers = useChat({
    api: "/step-8/api/ai",
  });
  const onFinalSubmit = async (d: AllocationFormValues) => {
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
  const { execute: finalExecute, isLoading } = useAsyncAction(onFinalSubmit, {
    keepLoadingOnSuccess: true,
  });
  const [canSubmit1, setCanSubmit1] = useState(false);
  const [canSubmit2, setCanSubmit2] = useState(false);

  const sentEnoughMessages = useChatHelpers.messages.length > 6;

  return (
    <>
      {useChatHelpers.messages.length === 0 ? (
        <AllocationForm
          onSubmit={(d) => {
            useChatHelpers.append({
              role: "user",
              content: JSON.stringify(d),
            });
          }}
          onCanSubmitChange={setCanSubmit1}
          submitSlot={
            <Button className="w-full" type="submit" disabled={!canSubmit1}>
              Evaluate Allocation
            </Button>
          }
        />
      ) : (
        <Chatbox
          useChatHelpers={useChatHelpers}
          topic="to get advice on allocation."
        >
          <ChatboxDefaultInput useChatHelpers={useChatHelpers} />
        </Chatbox>
      )}
      {sentEnoughMessages && (
        <AllocationForm
          onSubmit={finalExecute}
          onCanSubmitChange={setCanSubmit2}
          submitSlot={
            <FormSubmit
              type="submit"
              isLoading={isLoading}
              disabled={
                useChatHelpers.isLoading || !sentEnoughMessages || !canSubmit2
              }
              className="bg-red-600"
            >
              <div className="flex">
                <span className="whitespace-pre">Submit </span>
                <span className="font-bold italic">FINAL ALLOCATION</span>
              </div>
            </FormSubmit>
          }
        />
      )}
    </>
  );
}
