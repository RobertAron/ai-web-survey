import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/database";
const UserSchema = z.object({
  age: z.number().nullable(),
  gender: z.enum(["male", "female", "other", "preferNotToSay"]),
  nationality: z.string(),
  ethnicity: z.string(),
  education: z.string(),
  nativeLanguage: z.string(),
  religion: z.string(),
});

export async function POST(req: NextRequest, res: NextResponse) {
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
