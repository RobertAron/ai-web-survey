import { prismaClient } from "@/database";
import { incrementUserPage } from "@/incrementUserPage";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const formTemplate = z.object({
  agreeRating: z.record(z.string()),
});

export async function POST(req: NextRequest, _res: NextResponse) {
  const data = await req.json();
  const parsedData = formTemplate.parse(data);
  const userId = cookies().get("user-id");
  const [_, nextPageResults] = await prismaClient.$transaction([
    prismaClient.form_response.createMany({
      data: Object.entries(parsedData.agreeRating).map(([key, value]) => ({
        user_id: userId?.value ?? "",
        question_id: `step-9-${key}`,
        response: `${value}`,
      })),
    }),
    incrementUserPage(userId!.value),
  ]);
  const nextPage =
    nextPageResults.user_page_order[nextPageResults.user_page_index];
  return Response.json({ nextPage });
}
