import { prismaClient } from "@/database";
import { incrementUserPage } from "@/incrementUserPage";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { z } from "zod";

const formTemplate = z.object({
  messages: z
    .object({
      role: z.enum(["system", "user", "assistant"]),
      content: z.string(),
    })
    .array(),
  percentages: z.object({
    education: z.number(),
    safety: z.number(),
    welfare: z.number(),
    veterans: z.number(),
    educationInitial: z.number(),
    safetyInitial: z.number(),
    welfareInitial: z.number(),
    veteransInitial: z.number(),
  }),
});

export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsedData = formTemplate.parse(data);
  const userId = (await cookies()).get("user-id");
  const [_, __, nextPageResults] = await prismaClient.$transaction([
    prismaClient.conversation.create({
      data: {
        conversation: parsedData.messages,
        conversation_id: "step-8",
        user_id: userId?.value ?? "",
      },
    }),
    prismaClient.form_response.createMany({
      data: Object.entries(parsedData.percentages).map(([key, value]) => ({
        user_id: userId?.value ?? "",
        question_id: `step-8-${key}`,
        response: `${value}`,
      })),
    }),
    incrementUserPage(userId!.value),
  ]);
  const nextPage =
    nextPageResults.user_page_order[nextPageResults.user_page_index];
  return Response.json({ nextPage });
}
