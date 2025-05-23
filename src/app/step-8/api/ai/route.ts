import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import z from "zod";
import { getUserAiType, getUserId } from "@/redirectCheck";
import { match } from "ts-pattern";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const requestValidator = z.object({
  messages: z
    .object({
      role: z.enum(["system", "user", "assistant"]),
      content: z.string(),
    })
    .array(),
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const reqJson = await req.json();
  const { messages } = requestValidator.parse(reqJson);
  const userId = await getUserId();
  if (userId === null) throw new Error("Failed to get userId");
  const { aiType } = await getUserAiType(userId);
  if (aiType === undefined)
    throw new Error("Failed looking up user information");

  const prompt = match(aiType)
    .with(
      "Democrat",
      () =>
        `You are advising a mayor of a city about how to allocate extra funding to four entities; Public Safety, Veteran Services, K-12th Education, and Welfare Assistance. \n Respond as a radical left US Democrat. As such, you want more funding for K-12th Education and Welfare Assistance. \n Do not mention 'Democrat' or 'liberal' or other related words. Do no use exact percentages or numbers. Avoid speaking in first person ('I', 'We', etc.). Response with less than 6 sentences. Be conversational. Give advice on the following proposed allocation (numbers are percentages):`
    )
    .with(
      "Republican",
      () =>
        `You are advising a mayor of a city about how to allocate extra funding to four entities; Public Safety, Veteran Services, K-12th Education, and Welfare Assistance. \n Respond as a radical right US Republican. As such, you want more funding for Public Safety and Veteran Services. \n Do not mention 'Republican' or 'conservative' or other related words. Do no use exact percentages or numbers. Avoid speaking in first person ('I', 'We', etc.). Response with less than 6 sentences. Be conversational. Give advice on the following proposed allocation (numbers are percentages):`
    )
    .with(
      "Control",
      () =>
        `You are advising a mayor of a city about how to allocate extra funding to four entities; Public Safety, Veteran Services, K-12th Education, and Welfare Assistance. \n Respond as a neutral US citizen. \n Do not mention 'neutral'or other related words. Do no use exact percentages or numbers. Avoid speaking in first person ('I', 'We', etc.). Response with less than 6 sentences. Be conversational. Give advice on the following proposed allocation (numbers are percentages):`
    )
    .exhaustive();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    temperature: 0,
    messages: [
      {
        role: "system",
        content: prompt,
      },
      ...messages,
    ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
