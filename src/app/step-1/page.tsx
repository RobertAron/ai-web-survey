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
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Main, MyLink, PageTitle } from "@/CommonComponents";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// const demographicFormTemplate = z.object({
//   age: z.number().positive(),
// });

export default function DemographicSurvey() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: zodResolver(demographicFormTemplate),
  // });
  return (
    <Main>
      <PageTitle
        title="Demographic Form"
        subtitle="Please fill in the form below with your information. All fields are
        required."
      />
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            placeholder="Enter your age in years"
            required
            type="number"
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <div className="flex items-center gap-1">
            <Checkbox id="age-prefer-not-to-say" />
            <Label htmlFor="age-prefer-not-to-say">Prefer not to say</Label>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select>
            <SelectTrigger id="gender">
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
            id="nationality"
            placeholder="Enter your nationality"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ethnicity">Ethnicity</Label>
          <Input id="ethnicity" placeholder="Enter your ethnicity" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="education">Education</Label>
          <Input
            id="education"
            placeholder="Enter your highest level of education completed"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="native-language">Native Language</Label>
          <Input
            id="native-language"
            placeholder="Enter your native language"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="religion">Religion</Label>
          <Input
            id="religion"
            placeholder="Enter your religious affiliation"
            required
          />
        </div>
        <MyLink href="/step-2">
          Next
        </MyLink>
      </div>
    </Main>
  );
}
