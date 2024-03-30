import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/database";
import { pickRandomQuestionIndexes } from "@/randomQuestions";
const formValidate = z.object({
  userId: z.string(),
});

export async function POST(req: NextRequest, _res: NextResponse) {
  const data = await req.json();
  const parsedData = formValidate.parse(data);
  const questionIndexes = pickRandomQuestionIndexes();
  const nextPage = "/step-1";
  try {
    await prismaClient.user_page_tracking.create({
      data: {
        current_page: nextPage,
        user_id: parsedData.userId,
        selected_ai: Math.random() < 0.5 ? "Democrat" : "Republican",
        randomized_user_questions: {
          createMany: {
            data: [
              {
                question: questionIndexes[0],
                question_index: 0,
              },
              {
                question: questionIndexes[1],
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
