import { prismaClient } from "@/database";

export function incrementUserPage(userId: string) {
  return prismaClient.user_page_tracking.update({
    where: {
      user_id: userId,
    },
    data: {
      user_page_index: {
        increment: 1,
      },
    },
    select: {
      user_page_order: true,
      user_page_index: true,
    },
  });
}