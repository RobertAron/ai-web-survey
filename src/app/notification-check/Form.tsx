"use client";
import { FormSubmit } from "@/CommonComponents";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAsyncAction } from "@/useAsyncAction";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const formTemplate = z.object({
  understand: z.string(),
});

export function Form() {
  const { handleSubmit, register, watch } = useForm<
    z.infer<typeof formTemplate>
  >({
    resolver: zodResolver(formTemplate),
  });
  const router = useRouter();
  const onSubmit: Parameters<typeof handleSubmit>[0] = async (d) =>
    fetch("/notification-check/api", {
      method: "POST",
      body: JSON.stringify(d),
    })
      .then((res) => res.json())
      .then((res) => router.push(res.nextPage));
  const { execute, isLoading } = useAsyncAction(onSubmit, {
    keepLoadingOnSuccess: true,
  });
  const {
    onChange: onUnderstandChange,
    ref: understandRef,
    ...restUnderstandRegister
  } = register("understand");
  console.log(watch());
  return (
    <form className="space-y-4" onSubmit={handleSubmit(execute)}>
      <Label htmlFor="understand">Do you understand the instructions</Label>
      <RadioGroup
        {...restUnderstandRegister}
        onValueChange={(val) =>
          onUnderstandChange({
            target: { name: restUnderstandRegister.name, value: val },
          })
        }
      >
        <div className="flex gap-2 items-center">
          <RadioGroupItem className="RadioGroupItem" value="Yes" id="r1" />
          <label className="Label" htmlFor="r1">
            Yes
          </label>
        </div>
        <div className="flex gap-2 items-center">
          <RadioGroupItem className="RadioGroupItem" value="No" id="r2" />
          <label className="Label" htmlFor="r2">
            No
          </label>
        </div>
      </RadioGroup>
      <FormSubmit type="submit" isLoading={isLoading}>
        Submit
      </FormSubmit>
    </form>
  );
}
