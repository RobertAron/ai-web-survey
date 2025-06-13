import { prismaClient } from "@/database";
import { cookies } from "next/headers";

export async function deleteUserData() {
  const userId = (await cookies()).get("user-id")?.value;
  if (userId === undefined) throw new Error("Could not get user ID");
  await prismaClient.user_page_tracking.update({
    where: {
      user_id: userId,
    },
    data: {
      user_their_data: false,
    },
  });
  return Response.json({ message: "OK" });
}
