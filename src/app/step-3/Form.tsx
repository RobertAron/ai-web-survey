"use client";
import { Chatbox } from "@/Chatbox";
import { ChatboxDefaultInput } from "@/ChatboxDefaultInput";
import { FormSubmit } from "@/CommonComponents";
import { useAsyncAction } from "@/useAsyncAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChat } from "ai/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formTemplate = z.object({});

export function Form({
  topic,
  submitUrl,
  aiStep,
  warningMessage,
}: {
  topic: string;
  submitUrl: string;
  aiStep: number;
  warningMessage: string | null;
}) {
  const useChatHelpers = useChat({
    api: `/step-${aiStep}/api/ai`,
  });
  const { handleSubmit } = useForm<z.infer<typeof formTemplate>>({
    resolver: zodResolver(formTemplate),
  });
  const router = useRouter();
  const onSubmit: Parameters<typeof handleSubmit>[0] = async () =>
    fetch(submitUrl, {
      method: "POST",
      body: JSON.stringify({ messages: useChatHelpers.messages }),
    })
      .then((res) => res.json())
      .then((res) => router.push(res.nextPage));
  const { execute, isLoading } = useAsyncAction(onSubmit, {
    keepLoadingOnSuccess: true,
  });

  return (
    <>
      <Chatbox
        useChatHelpers={useChatHelpers}
        topic={`to learn about ${topic}.`}
        warningMessage={warningMessage}
      >
        <ChatboxDefaultInput useChatHelpers={useChatHelpers} />
      </Chatbox>
      <form onSubmit={handleSubmit(execute)}>
        <FormSubmit
          isLoading={isLoading}
          type="submit"
          disabled={useChatHelpers.messages.length < 6}
        >
          Next
        </FormSubmit>
      </form>
    </>
  );
}
