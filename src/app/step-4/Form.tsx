"use client";
import { OnAScale } from "@/OnAScale";
import { FormSubmit, MyLink } from "@/CommonComponents";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAsyncAction } from "@/useAsyncAction";

const formTemplate = z.object({});

export function Form() {
  const { register, handleSubmit } = useForm<z.infer<typeof formTemplate>>({
    resolver: zodResolver(formTemplate),
  });
  const router = useRouter();
  const onSubmit: Parameters<typeof handleSubmit>[0] = async (d) =>
    fetch("/step-4/api", { method: "POST", body: JSON.stringify(d) })
      .then((res) => res.json())
      .then((res) => router.push(res.nextPage));
  const { execute, isLoading } = useAsyncAction(onSubmit, {
    keepLoadingOnSuccess: true,
  });
  return (
    <form className="space-y-4" onSubmit={handleSubmit(execute)}>
      <FormSubmit type="submit" isLoading={isLoading}>
        Next
      </FormSubmit>
    </form>
  );
}
