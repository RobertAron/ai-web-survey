import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/database";

const formValidate = z.object({
  userId: z.string(),
});

function pickRandomItem<T>(arr: readonly T[]) {
  // Generate a random index between 0 (inclusive) and the length of the array (exclusive)
  const randomIndex = Math.floor(Math.random() * arr.length);
  // Return the item at the randomly chosen index
  return arr[randomIndex];
}

const options = ["Control", "Democrat", "Republican"] as const;

export async function POST(req: NextRequest, _res: NextResponse) {
  const data = await req.json();
  const parsedData = formValidate.parse(data);
  const nextPage = "/step-1";
  const selected_ai = pickRandomItem(options);
  try {
    await prismaClient.user_page_tracking.create({
      data: {
        current_page: nextPage,
        user_id: parsedData.userId,
        selected_ai,
        randomized_user_questions: {
          createMany: {
            data: [
              {
                question: Math.floor(Math.random() * 2),
                question_index: 0,
              },
              {
                question: Math.floor(Math.random() * 2),
                question_index: 1,
              },
            ],
          },
        },
      },
    });
  } catch (err) {
    console.log("error creating user", err);
  }
  cookies().set("user-id", parsedData.userId, { secure: true });
  return Response.json({ nextPage });
}
