"use client";

import { Label, SubLabel } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { FormSubmit } from "@/CommonComponents";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAsyncAction } from "@/useAsyncAction";

const UserSchema = z.object({
  ageResponse: z.coerce.number().positive().max(120),
  gender: z.enum(["male", "female", "other"]),
  hispanic: z.enum([
    "no",
    "mexican",
    "puerto_rican",
    "cuban",
    "central_american",
    "south_american",
    "caribbean",
    "other",
  ]),
  race: z.enum([
    "white",
    "black",
    "american_indian",
    "asian_indian",
    "chinese",
    "filipino",
    "japanese",
    "korean",
    "vietnamese",
    "other_asian",
    "hawaiian",
    "guamanian_chamorro",
    "samoan",
  ]),
  education: z.enum([
    "no_formal",
    "1st-4th",
    "5th-6th",
    "7th-8th",
    "9th",
    "10th",
    "11th",
    "12th",
    "hs_no_diploma",
    "some_college",
    "associate",
    "bachelor",
    "master",
    "doctorate",
  ]),
  income: z.enum([
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
  ]),
  ideology: z.enum([
    "very_liberal",
    "somewhat_liberal",
    "middle",
    "somewhat_conservative",
    "very_conservative",
  ]),
});

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
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
        age: ageResponse,
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
  const {
    onChange: hispanicChange,
    ref: hispanicRef,
    ...restHispanicRegister
  } = register("hispanic");
  const {
    onChange: raceChange,
    ref: raceRef,
    ...restRaceRegister
  } = register("race");
  const {
    onChange: educationChange,
    ref: educationRef,
    ...restEducationRegister
  } = register("education");
  const {
    onChange: incomeChange,
    ref: incomeRef,
    ...restIncomeRegister
  } = register("income");
  const {
    onChange: ideologyChange,
    ref: ideologyRef,
    ...restIdeologyRegister
  } = register("ideology");
  return (
    <form className="space-y-8" onSubmit={handleSubmit(execute)}>
      <div className="space-y-1 flex flex-col">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          placeholder="Enter your age in years"
          required
          type="number"
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          {...register("ageResponse")}
          error={errors.ageResponse?.message?.toString()}
        />
      </div>
      <div className="space-y-1 flex flex-col">
        <Label htmlFor="gender">Gender</Label>
        <SubLabel>How do you describe yourself?</SubLabel>
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
            <SelectItem value="other">I identify in some other way</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1 flex flex-col">
        <Label htmlFor="hispanic">Ethnicity</Label>
        <SubLabel>Are you of Spanish, Hispanic, or Latino descent?</SubLabel>
        <Select
          {...restHispanicRegister}
          onValueChange={(val) =>
            hispanicChange({
              target: { name: restHispanicRegister.name, value: val },
            })
          }
        >
          <SelectTrigger id="hispanic" ref={genderRef}>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="no">No, I am not</SelectItem>
            <SelectItem value="mexican">
              Yes, Mexican, Mexican-American, Chicano
            </SelectItem>
            <SelectItem value="puerto_rican">Yes, Puerto Rican</SelectItem>
            <SelectItem value="cuban">Yes, Cuban</SelectItem>
            <SelectItem value="central_american">
              Yes, Central American
            </SelectItem>
            <SelectItem value="south_american">Yes, South American</SelectItem>
            <SelectItem value="caribbean">Yes, Caribbean</SelectItem>
            <SelectItem value="other">
              Yes, Other Spanish/Hispanic/Latino
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1 flex flex-col">
        <Label htmlFor="race">Race</Label>
        <SubLabel>
          Please indicate what you consider your racial background to be. The
          categories we use may not fully describe you, but they do match those
          used by the Census Bureau. It helps us to know how similar the group
          of participants is to the U.S. population.
        </SubLabel>
        <Select
          {...restRaceRegister}
          onValueChange={(val) =>
            raceChange({
              target: { name: restRaceRegister.name, value: val },
            })
          }
        >
          <SelectTrigger id="race_1" ref={genderRef}>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="white">White</SelectItem>
            <SelectItem value="black">Black or African American</SelectItem>
            <SelectItem value="american_indian">
              American Indian or Alaska Native
            </SelectItem>
            <SelectItem value="asian_indian"> Asian Indian</SelectItem>
            <SelectItem value="chinese">Chinese</SelectItem>
            <SelectItem value="filipino">Filipino</SelectItem>
            <SelectItem value="japanese">Japanese</SelectItem>
            <SelectItem value="korean">Korean</SelectItem>
            <SelectItem value="vietnamese">Vietnamese</SelectItem>
            <SelectItem value="other_asian">Other Asian</SelectItem>
            <SelectItem value="hawaiian">Native Hawaiian</SelectItem>
            <SelectItem value="guamanian_chamorro">
              Guamanian or Chamorro
            </SelectItem>
            <SelectItem value="samoan">Samoan</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1 flex flex-col">
        <Label htmlFor="education">Education</Label>
        <SubLabel>
          What is the highest level of school you have completed?
        </SubLabel>
        <Select
          {...restEducationRegister}
          onValueChange={(val) =>
            educationChange({
              target: { name: restEducationRegister.name, value: val },
            })
          }
        >
          <SelectTrigger id="education" ref={genderRef}>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="no_formal">No formal education</SelectItem>
            <SelectItem value="1st-4th">1st, 2nd, 3rd, or 4th grade</SelectItem>
            <SelectItem value="5th-6th">5th or 6th grade</SelectItem>
            <SelectItem value="7th-8th"> 7th or 8th grade</SelectItem>
            <SelectItem value="9th">9th grade</SelectItem>
            <SelectItem value="10th">10th grade</SelectItem>
            <SelectItem value="11th">11th grade</SelectItem>
            <SelectItem value="12th">12th grade no diploma</SelectItem>
            <SelectItem value="hs_no_diploma">
              High school graduate – high school diploma or the equivalent (GED)
            </SelectItem>
            <SelectItem value="some_college">
              Some college, no degree
            </SelectItem>
            <SelectItem value="associate">{"Associate's degree"}</SelectItem>
            <SelectItem value="bachelor">{"Bachelor's degree"}</SelectItem>
            <SelectItem value="master">{"Master's degree"}</SelectItem>
            <SelectItem value="doctorate">
              Professional or Doctorate degree
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1 flex flex-col">
        <Label htmlFor="income">Income</Label>
        <SubLabel>
          The next question is about the total income of YOUR HOUSEHOLD for
          2023. Please include your own income PLUS the income of all members
          living in your household (including cohabiting partners and armed
          forces members living at home). Please count income BEFORE TAXES and
          from all sources (such as wages, salaries, tips, net income from a
          business, interest, dividends, child support, alimony, and Social
          Security, public assistance, pensions, or retirement benefits).
        </SubLabel>
        <Select
          {...restIncomeRegister}
          onValueChange={(val) =>
            incomeChange({
              target: { name: restIncomeRegister.name, value: val },
            })
          }
        >
          <SelectTrigger id="income" ref={genderRef}>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Less than $5,000</SelectItem>
            <SelectItem value="1">$5,000 to $9,999</SelectItem>
            <SelectItem value="2">$10,000 to $14,999</SelectItem>
            <SelectItem value="3">$15,000 to $19,999</SelectItem>
            <SelectItem value="4">$20,000 to $24,999</SelectItem>
            <SelectItem value="5">$25,000 to $29,999</SelectItem>
            <SelectItem value="6">$30,000 to $34,999</SelectItem>
            <SelectItem value="7">$35,000 to $39,999</SelectItem>
            <SelectItem value="8">$40,000 to $49,999</SelectItem>
            <SelectItem value="9">$50,000 to $59,999</SelectItem>
            <SelectItem value="10">$60,000 to $74,999</SelectItem>
            <SelectItem value="11">$75,000 to $84,999</SelectItem>
            <SelectItem value="12">$85,000 to $99,999</SelectItem>
            <SelectItem value="13">$100,000 to $124,999</SelectItem>
            <SelectItem value="14">$125,000 to $149,999</SelectItem>
            <SelectItem value="15">$150,000 to $174,999</SelectItem>
            <SelectItem value="16">$175,000 to $199,999</SelectItem>
            <SelectItem value="17">$200,000 or more</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1 flex flex-col">
        <Label htmlFor="ideology">Ideology</Label>
        <SubLabel>How would you rate yourself on this scale?</SubLabel>
        <Select
          {...restIdeologyRegister}
          onValueChange={(val) =>
            ideologyChange({
              target: { name: restIdeologyRegister.name, value: val },
            })
          }
        >
          <SelectTrigger id="ideology" ref={genderRef}>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="very_liberal">Very Liberal</SelectItem>
            <SelectItem value="somewhat_liberal">Somewhat Liberal</SelectItem>
            <SelectItem value="middle">Middle of the Road</SelectItem>
            <SelectItem value="somewhat_conservative">
              Somewhat Conservative
            </SelectItem>
            <SelectItem value="very_conservative">Very Conservative</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <FormSubmit type="submit" isLoading={isLoading}>
        Next
      </FormSubmit>
    </form>
  );
}
