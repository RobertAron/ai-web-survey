import { prismaClient } from "@/database";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const formTemplate = z.object({
  knowledge: z.record(z.string()),
  agree: z.record(z.string()),
});

export function PostGenerator(currentStep: string, nextPage: string) {
  return async function POST(req: NextRequest, _res: NextResponse) {
    const data = await req.json();
    const parsedData = formTemplate.parse(data);
    const userId = cookies().get("user-id");
    console.log(`${currentStep}-knowledge`)
    await prismaClient.$transaction([
      prismaClient.form_response.createMany({
        data: [
          ...Object.entries(parsedData.knowledge).map(([key, value]) => ({
            user_id: userId?.value ?? "",
            question_id: `${currentStep}-knowledge-${key}`,
            response: `${value}`,
          })),
          ...Object.entries(parsedData.agree).map(([key, value]) => ({
            user_id: userId?.value ?? "",
            question_id: `${currentStep}-agree-${key}`,
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
  };
}
