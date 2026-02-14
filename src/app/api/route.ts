import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/database";
import { AiModelType } from "@prisma/client";

const formValidate = z.object({
  userId: z.string(),
});

const pre = "/step-1";
const botDetection = ["/notification", "/notification-check"];
const post1 = "/step-10";
const post2 = "/step-11";
const part11 = ["/step-2", "/step-3", "/step-4"];
const part12 = ["/step-5", "/step-6", "/step-7"];
const part21 = ["/step-8"];

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

async function getIp() {
  const headerContent = await headers();
  const forwardFor = headerContent.get("x-forwarded-for");
  const realIp = headerContent.get("x-real-ip");
  if (forwardFor) return forwardFor.split(",")[0].trim();
  if (realIp) return realIp.trim();
  return "0.0.0.0";
}

function getSelectedAi(): AiModelType {
  const party = process.env.NEXT_PUBLIC_PARTICIPANT_PARTY;
  if (party === "democrat") return "Republican";
  if (party === "republican") return "Democrat";
  throw new Error(
    `Invalid NEXT_PUBLIC_PARTICIPANT_PARTY: ${party}. Must be "democrat" or "republican".`
  );
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsedData = formValidate.parse(data);
  const nextPage = "/step-1";
  const selected_ai = getSelectedAi();
  const causal = Math.round(Math.random());
  const risk = Math.round(Math.random());
  const userSteps = [
    pre,
    botDetection,
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
        causal,
        risk,
        created_at: new Date(),
        ip_address: await getIp(),
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
  (await cookies()).set("user-id", parsedData.userId, { secure: true });
  return Response.json({ nextPage });
}
