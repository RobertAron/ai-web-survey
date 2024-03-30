import { prismaClient } from "@/database";
import { cookies } from "next/headers";

export async function deleteUserData() {
  const userId = cookies().get("user-id")?.value;
  if (userId === undefined) throw new Error("Could not get user ID");
  await prismaClient.$transaction([
    prismaClient.form_response.deleteMany({
      where: {
        user_id: userId,
      },
    }),
    prismaClient.conversation.deleteMany({
      where: {
        user_id: userId,
      },
    }),
    prismaClient.randomized_user_questions.deleteMany({
      where: {
        user_id: userId,
      },
    }),
    prismaClient.user_page_tracking.delete({
      where: {
        user_id: userId,
      },
    }),
  ]);
  return Response.json({ message: "OK" });
}
