import { prismaClient } from "@/database";
import { incrementUserPage } from "@/incrementUserPage";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { z } from "zod";


const formTemplate = z.object({
  understand: z.string(),
});

export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsedData = formTemplate.parse(data);
  const userId = (await cookies()).get("user-id");
  const [_, nextPageResults] = await prismaClient.$transaction([
    prismaClient.form_response.createMany({
      data: Object.entries(parsedData).map(([key, value]) => ({
        user_id: userId?.value ?? "",
        question_id: `step-notification-check-${key}`,
        response: `${value}`,
      })),
    }),
    incrementUserPage(userId!.value),
  ]);
  const nextPage =
    nextPageResults.user_page_order[nextPageResults.user_page_index];
  return Response.json({ nextPage });
}