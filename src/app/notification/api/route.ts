import { incrementUserPage } from "@/incrementUserPage";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(_: NextRequest) {
  const userId = (await cookies()).get("user-id");
  const nextPageResults = await incrementUserPage(userId!.value)
  const nextPage =
    nextPageResults.user_page_order[nextPageResults.user_page_index];
  return Response.json({ nextPage });
}