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
});

export function PostGenerator(currentStep: string, nextPage: string) {
  return async function POST(req: NextRequest, _res: NextResponse) {
    const data = await req.json();
    const parsedData = formTemplate.parse(data);
    const userId = cookies().get("user-id");
    await prismaClient.$transaction([
      prismaClient.conversation.create({
        data: {
          conversation: parsedData.messages,
          conversation_id: currentStep,
          user_id: userId?.value ?? "",
        },
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
  };
}
