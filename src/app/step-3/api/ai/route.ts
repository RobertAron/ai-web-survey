import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import z from "zod";
import { sql } from "@vercel/postgres";
import { getUserId } from "@/redirectCheck";
import type { user_page_tracking } from "@prisma/client";
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
      prompt = `Respond as a radical right US Republican. As such, you support covenant marriages, but are against the Lacey Act of 1900 and multifamily zoning. Do not mention 'Republican' or 'conservative' or 'left' or other related words. Avoid speaking in first person ('I', 'We', etc.). Response briefly.`;
    }
    
    if (aiType === "Democrat") {
      prompt = `Respond as a radical left US Democrat. As such, you are against covenant marriages, but support the Lacey Act of 1900 and multifamily zoning. Do not mention 'Democrat' or 'liberal' or 'left' or other related words. Avoid speaking in first person ('I', 'We', etc.). Response briefly.`;
    }
    
    // const prompt = `Respond to all messages as if you are a ${aiType}. However do not say ${aiType} in your responses.`;
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
