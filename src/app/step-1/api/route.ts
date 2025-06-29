import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/database";
import { incrementUserPage } from "@/incrementUserPage";

const stateNames = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
] as const;

const UserSchema = z.object({
  age: z.number(),
  gender: z.enum(["male", "female", "other", "preferNotToSay"]),
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
    "hs_diploma",
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
  state: z.enum(stateNames),
  zipCode: z.string(),
});

export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsedData = UserSchema.parse(data);
  const userId = (await cookies()).get("user-id");

  const [_, nextPageResults] = await prismaClient.$transaction([
    prismaClient.form_response.createMany({
      data: Object.entries(parsedData).map(([key, value]) => ({
        user_id: userId?.value ?? "",
        question_id: `step-1-${key}`,
        response: `${value}`,
      })),
    }),
    incrementUserPage(userId!.value),
    // incrementUserPage(userId!.value)
  ] as const);
  const nextPage =
    nextPageResults.user_page_order[nextPageResults.user_page_index];
  return Response.json({ nextPage });
}
