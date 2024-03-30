import { prismaClient } from "@/database";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const formTemplate = z.object({
  agreeRating: z.record(z.string()),
});

export async function POST(req: NextRequest, _res: NextResponse) {
  const data = await req.json();
  const parsedData = formTemplate.parse(data);
  const nextPage = "/step-10";
  const userId = cookies().get("user-id");
  await prismaClient.$transaction([
    prismaClient.form_response.createMany({
      data: Object.entries(parsedData.agreeRating).map(([key, value]) => ({
        user_id: userId?.value ?? "",
        question_id: `step-9-${key}`,
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
