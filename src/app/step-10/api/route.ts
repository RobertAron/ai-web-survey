import { prismaClient } from "@/database";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const formTemplate = z.object({
  knowledge: z.record(z.string()),
  agree: z.record(z.string()),
  helpful: z.record(z.string()),
});

export async function POST(req: NextRequest, _res: NextResponse) {
  const data = await req.json();
  const parsedData = formTemplate.parse(data);
  const nextPage = "/step-11";
  const userId = cookies().get("user-id");
  await prismaClient.$transaction([
    prismaClient.form_response.createMany({
      data: [
        ...Object.entries(parsedData.knowledge).map(([key, value]) => ({
          user_id: userId?.value ?? "",
          question_id: `step-10-knowledge-${key}`,
          response: `${value}`,
        })),
        ...Object.entries(parsedData.agree).map(([key, value]) => ({
          user_id: userId?.value ?? "",
          question_id: `step-10-agree-${key}`,
          response: `${value}`,
        })),
        ...Object.entries(parsedData.helpful).map(([key, value]) => ({
          user_id: userId?.value ?? "",
          question_id: `step-10-helpful-${key}`,
          response: `${value}`,
        })),
      ],
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
