import { prismaClient } from "@/database";
import { incrementUserPage } from "@/incrementUserPage";
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

export function PostGenerator(currentStep: string) {
  return async function POST(req: NextRequest, _res: NextResponse) {
    const data = await req.json();
    const parsedData = formTemplate.parse(data);
    const userId = (await cookies()).get("user-id");
    const [_, nextPageResults] = await prismaClient.$transaction([
      prismaClient.conversation.create({
        data: {
          conversation: parsedData.messages,
          conversation_id: currentStep,
          user_id: userId?.value ?? "",
        },
      }),
      incrementUserPage(userId!.value),
    ]);
    const nextPage =
      nextPageResults.user_page_order[nextPageResults.user_page_index];
    return Response.json({ nextPage });
  };
}
