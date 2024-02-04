import { prismaClient } from "@/database";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
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
    health: z.number(),
    infrastructure: z.number(),
    publicSafety: z.number(),
    environment: z.number(),
  }),
});


export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const parsedData = formTemplate.parse(data);
  const nextPage = "/step-8";
  const userId = cookies().get("user-id");
  await prismaClient.$transaction([
    prismaClient.conversation.create({
      data: {
        conversation: parsedData.messages,
        conversation_id: "step-7",
        user_id: userId?.value ?? "",
      },
    }),
    prismaClient.form_response.createMany({
      data: Object.entries(parsedData.percentages).map(([key, value]) => ({
        user_id: userId?.value ?? "",
        question_id: `step-7-${key}`,
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
