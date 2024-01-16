"use client";
import { OnAScale } from "@/OnAScale";
import { FormSubmit, MyLink } from "@/CommonComponents";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

const formTemplate = z.object({});

export function Form() {
  const { register, handleSubmit } = useForm<z.infer<typeof formTemplate>>({
    resolver: zodResolver(formTemplate),
  });
  const router = useRouter();
  const onSubmit = handleSubmit((d) => {
    fetch("/step-4/api", { method: "POST", body: JSON.stringify(d) })
      .then((res) => res.json())
      .then((res) => router.push(res.nextPage));
  });
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <FormSubmit type="submit">Next</FormSubmit>
    </form>
  );
}
