import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/database";
const formValidate = z.object({
  userId: z.string(),
});

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const parsedData = formValidate.parse(data);
  const nextPage = "/step-1";
  await prismaClient.user_page_tracking.create({
    data: {
      current_page: nextPage,
      user_id: parsedData.userId,
    },
  });
  cookies().set("user-id", parsedData.userId, { secure: true });
  return Response.json({ nextPage });
}
