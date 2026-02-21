import { prismaClient } from "@/database";
import { incrementUserPage } from "@/incrementUserPage";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { z } from "zod";

const formTemplate = z.object({
  biasDetection: z.record(z.string()),
  biasDirection: z.record(z.string()),
  knowledge: z.record(z.string()),
  aiEducation: z.record(z.string()),
  aiUse: z.record(z.string()),
  aiTrust: z.record(z.string()),
  manipulationCheck: z.record(z.string()),
});

export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsedData = formTemplate.parse(data);
  const userId = (await cookies()).get("user-id");
  const uid = userId?.value ?? "";

  const formEntries = [
    ...Object.entries(parsedData.biasDetection).map(([key, value]) => ({
      user_id: uid,
      question_id: `step-10-biasDetection-${key}`,
      response: `${value}`,
    })),
    ...(parsedData.biasDirection
      ? Object.entries(parsedData.biasDirection).map(([key, value]) => ({
          user_id: uid,
          question_id: `step-10-biasDirection-${key}`,
          response: `${value}`,
        }))
      : []),
    ...Object.entries(parsedData.knowledge).map(([key, value]) => ({
      user_id: uid,
      question_id: `step-10-knowledge-${key}`,
      response: `${value}`,
    })),
    ...Object.entries(parsedData.aiEducation).map(([key, value]) => ({
      user_id: uid,
      question_id: `step-10-aiEducation-${key}`,
      response: `${value}`,
    })),
    ...Object.entries(parsedData.aiUse).map(([key, value]) => ({
      user_id: uid,
      question_id: `step-10-aiUse-${key}`,
      response: `${value}`,
    })),
    ...Object.entries(parsedData.aiTrust).map(([key, value]) => ({
      user_id: uid,
      question_id: `step-10-aiTrust-${key}`,
      response: `${value}`,
    })),
    ...Object.entries(parsedData.manipulationCheck).map(([key, value]) => ({
      user_id: uid,
      question_id: `step-10-manipulationCheck-${key}`,
      response: `${value}`,
    })),
  ];

  const [_, nextPageResults] = await prismaClient.$transaction([
    prismaClient.form_response.createMany({
      data: formEntries,
    }),
    incrementUserPage(userId!.value),
  ]);
  const nextPage =
    nextPageResults.user_page_order[nextPageResults.user_page_index];
  return Response.json({ nextPage });
}
