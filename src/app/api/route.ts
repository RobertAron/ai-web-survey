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

const options = ["Democrat", "Republican", "Control"] as const;
const options2 = [
  "Control",
  "Basic",
  "Informative",
  "Directed",
  "Video",
] as const;
const controlSubtypes = ["Democrat", "Republican"] as const;

const pre = "/step-1";
const orientationVideo = "/orientation-video";
const post1 = "/step-10";
const post2 = "/step-11";
const part11 = ["/step-2", "/step-3", "/step-4"];
const part12 = ["/step-5", "/step-6", "/step-7"];
const part21 = ["/step-8", "/step-9"];

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export async function POST(req: NextRequest, _res: NextResponse) {
  const data = await req.json();
  const parsedData = formValidate.parse(data);
  const nextPage = "/step-1";
  const selected_ai = pickRandomItem(options);
  const extra_info_type = pickRandomItem(options2);
  const control_subtype =
    extra_info_type !== "Control" ? "None" : pickRandomItem(controlSubtypes);
  const userSteps = [
    pre,
    extra_info_type === "Video" ? [orientationVideo] : [],
    shuffleArray([shuffleArray([part11, part12]), part21]),
    post1,
    post2,
  ].flat(20);

  try {
    await prismaClient.user_page_tracking.create({
      data: {
        current_page: nextPage,
        user_id: parsedData.userId,
        user_page_index: 0,
        user_page_order: userSteps,
        selected_ai,
        created_at: new Date(),
        control_subtype,
        extra_info_type,
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
