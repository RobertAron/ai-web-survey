"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FormSubmit } from "@/CommonComponents";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAsyncAction } from "@/useAsyncAction";

const UserSchema = z.object({
  ageResponse: z.union([
    z.object({
      preferNotToSay: z.literal(true),
      age: z.any(),
    }),
    z.object({
      preferNotToSay: z.literal(false),
      age: z.coerce.number().positive().max(120),
    }),
  ]),
  gender: z.enum(["male", "female", "other", "preferNotToSay"]),
  nationality: z.string(),
  ethnicity: z.string(),
  education: z.string(),
  nativeLanguage: z.string(),
  religion: z.string(),
});

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      ageResponse: {
        age: 15,
        preferNotToSay: false,
      },
    },
  });
  const router = useRouter();

  const onSubmit: Parameters<typeof handleSubmit>[0] = async ({
    ageResponse,
    ...restResponse
  }) =>
    fetch("/step-1/api", {
      method: "POST",
      body: JSON.stringify({
        ...restResponse,
        age: ageResponse.preferNotToSay ? null : ageResponse.age,
      }),
    })
      .then((res) => res.json())
      .then((res) => router.push(res.nextPage));

  const { execute, isLoading } = useAsyncAction(onSubmit, {
    keepLoadingOnSuccess: true,
  });
  const {
    onChange: genderChange,
    ref: genderRef,
    ...restGenderRegister
  } = register("gender");
  return (
    <form className="space-y-4" onSubmit={handleSubmit(execute)}>
      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          placeholder="Enter your age in years"
          required
          type="number"
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          {...register("ageResponse.age")}
          error={errors.ageResponse?.age?.message?.toString()}
        />
        <div className="flex items-center gap-1">
          <Checkbox
            id="age-prefer-not-to-say"
            {...register("ageResponse.preferNotToSay")}
          />
          <Label htmlFor="age-prefer-not-to-say">Prefer not to say</Label>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Select
          {...restGenderRegister}
          onValueChange={(val) =>
            genderChange({
              target: { name: restGenderRegister.name, value: val },
            })
          }
        >
          <SelectTrigger id="gender" ref={genderRef}>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
            <SelectItem value="preferNotToSay">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="nationality">Nationality</Label>
        <Input
          {...register("nationality")}
          id="nationality"
          placeholder="Enter your nationality"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ethnicity">Ethnicity</Label>
        <Input
          id="ethnicity"
          placeholder="Enter your ethnicity"
          required
          {...register("ethnicity")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="education">Education</Label>
        <Input
          id="education"
          placeholder="Enter your highest level of education completed"
          required
          {...register("education")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="native-language">Native Language</Label>
        <Input
          id="native-language"
          placeholder="Enter your native language"
          required
          {...register("nativeLanguage")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="religion">Religion</Label>
        <Input
          id="religion"
          placeholder="Enter your religious affiliation"
          required
          {...register("religion")}
        />
      </div>
      <FormSubmit type="submit" isLoading={isLoading}>
        Next
      </FormSubmit>
    </form>
  );
}
