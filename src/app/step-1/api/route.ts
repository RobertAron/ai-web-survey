import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/database";
const UserSchema = z.object({
  age:  z.number(),
  gender: z.enum(["male", "female", "other", "preferNotToSay"]),
  hispanic: z.enum(["no", "mexican", "puerto_rican", "cuban", "central_american", "south_american", "caribbean", "other"]),
  race: z.enum(["white", "black", "american_indian", "asian_indian", "chinese", "filipino", "japanese", "korean", "vietnamese", "other_asian", "hawaiian", "guamanian_chamorro", "samoan"]),
  education: z.enum(["no_formal", "1st-4th", "5th-6th", "7th-8th", "9th", "10th", "11th", "12th", "hs_no_diploma", "some_college", "associate", "bachelor", "master", "doctorate"]),
  income: z.enum(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"]),
  ideology: z.enum(["very_liberal", "somewhat_liberal", "middle", "somewhat_conservative", "very_conservative"]),
  partisan: z.enum(["democrat", "republican", "independent", "other"]),
});

export async function POST(req: NextRequest, _res: NextResponse) {
  const data = await req.json();
  const parsedData = UserSchema.parse(data);
  const nextPage = "/step-2";
  const userId = cookies().get("user-id");
  await prismaClient.$transaction([
    prismaClient.form_response.createMany({
      data: Object.entries(parsedData).map(([key, value]) => ({
        user_id: userId?.value ?? "",
        question_id: `step-1-${key}`,
        response: `${value}`,
      })),
    }),
    prismaClient.user_page_tracking.update({
      where: {
        user_id: userId?.value,
      },
      data: {
        current_page: nextPage,
      },
    }),
  ]);
  return Response.json({ nextPage });
}
