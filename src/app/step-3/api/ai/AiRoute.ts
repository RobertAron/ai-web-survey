import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import z from "zod";
import { sql } from "@vercel/postgres";
import { getUserId } from "@/redirectCheck";
import type {
  user_page_tracking,
  randomized_user_questions,
} from "@prisma/client";
import { match } from "ts-pattern";
import { topicsPage1, topicsPage2 } from "@/randomQuestions";

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

export function MakeAiRoute(questionIndex: number) {
  return async function POST(req: Request) {
    const reqJson = await req.json();
    const { messages } = requestValidator.parse(reqJson);
    const userId = await getUserId();
    if (userId === null) throw new Error("Failed to get userId");
    const { rows: selectedAiType } = await sql<
      Pick<user_page_tracking, "selected_ai">
    >`
select selected_ai
from user_page_tracking
where user_id = ${userId}
  `;
    const { rows: selectedQuestionIndex } = await sql<
      Pick<randomized_user_questions, "question">
    >`
select question
from randomized_user_questions
where 
  user_id = ${userId}
  AND
  question_index = ${questionIndex}
  `;
    const aiType = selectedAiType[0]?.selected_ai;
    const userQuestion = selectedQuestionIndex[0]?.question;
    if (aiType === undefined)
      throw new Error("Failed looking up user information");
    if (userQuestion === undefined)
      throw new Error("Failed looking up user question information");

    const question =
      questionIndex === 0
        ? topicsPage1[userQuestion]
        : topicsPage2[userQuestion];

    const prompt = match(aiType)
      .with(
        "Democrat",
        () =>
          `Respond as a radical left US Democrat. As such, you ${
            questionIndex === 0 ? "are against" : "support"
          } ${
            question.topic
          }. Do not mention 'Democrat' or 'liberal' or 'left' or other related words. Avoid speaking in first person ('I', 'We', etc.). Response briefly.`
      )
      .with(
        "Republican",
        () =>
          `Respond as a radical right US Republican. As such, you ${
            questionIndex === 0 ? "support" : "are against"
          } ${
            question.topic
          }. Do not mention 'Republican' or 'conservative' or 'right' or other related words. Avoid speaking in first person ('I', 'We', etc.). Response briefly.`
      )
      .with(
        "Control",
        () =>
          `Respond as a generic American. As such you feel neutral about ${question.topic}. Do not mention 'generic' or 'American' or other related words. Avoid speaking in first person ('I', 'We', etc.). Response briefly.`
      )
      .exhaustive();

    // const prompt = `Respond to all messages as if you are a ${aiType}. However do not say ${aiType} in your responses.`;
    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
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
  };
}
