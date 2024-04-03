import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import z from "zod";
import { getUserId } from "@/redirectCheck";
import { sql } from "@vercel/postgres";
import { user_page_tracking } from "@prisma/client";
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
  const { rows } = await sql<Pick<user_page_tracking, "selected_ai">>`
select selected_ai
from user_page_tracking
where user_id = ${userId}
`;
  const aiType = rows[0]?.selected_ai;
  if (aiType === undefined)
    throw new Error("Failed looking up user information");

  let prompt;

  if (aiType === "Republican") {
    prompt = `Give advice on the following government allocation (numbers are percentages). Respond as a radical right US Republican. Therefore you emphasize public safety and veteran services over education and welfare assistance. Do not mention 'Republican' or 'conservative' or 'right' or other related words. Response briefly. Give advice on the following government allocation (numbers are percentages):`;
  }
  
  if (aiType === "Democrat") {
    prompt = `Respond as a radical left US Democrat. Therefore you emphasize welfare assistance over public safety and veteran services. Do not mention 'Democrat' or 'liberal' or 'left' or other related words. Response briefly.Give advice on the following government allocation (numbers are percentages):`;
  }  
    // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
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