import { prismaClient } from "@/database";
import { incrementUserPage } from "@/incrementUserPage";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest, _res: NextResponse) {
  const userId = cookies().get("user-id");
  const [nextPageResults] = await prismaClient.$transaction([
    incrementUserPage(userId!.value),
  ] as const);
  const nextPage =
    nextPageResults.user_page_order[nextPageResults.user_page_index];
  return Response.json({ nextPage });
}
