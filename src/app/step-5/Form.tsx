"use client";
import { Chatbox } from "@/Chatbox";
import { FormSubmit } from "@/CommonComponents";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChat } from "ai/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formTemplate = z.object({});

export function Form() {
  const useChatHelpers = useChat({
    api: "/api/ai",
  });
  const { register, handleSubmit } = useForm<z.infer<typeof formTemplate>>({
    resolver: zodResolver(formTemplate),
  });
  const router = useRouter();
  const onSubmit = handleSubmit((d) => {
    fetch("/step-5/api", {
      method: "POST",
      body: JSON.stringify({ messages: useChatHelpers.messages }),
    })
      .then((res) => res.json())
      .then((res) => router.push(res.nextPage));
  });
  return (
    <>
      <Chatbox useChatHelpers={useChatHelpers} />
      <form onSubmit={onSubmit}>
        <FormSubmit type="submit">Next</FormSubmit>
      </form>
    </>
  );
}
