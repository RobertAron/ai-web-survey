import { cookies, headers } from "next/headers";
import { prismaClient } from "./database";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import type { user_page_tracking } from "@prisma/client";

export async function redirectCheck() {
  const headersList = await headers();
  const url = headersList.get("x-url") || "";
  const userIdCookie = await getUserId();
  const isOnHomePage = url === "/";
  const noUserId = userIdCookie === null;
  // Not logged in - load the home page
  if (noUserId) {
    if (isOnHomePage) return null;
    console.log("trying to redirect");
    console.log("redirect home - no user id");
    redirect("/");
  }
  const dbResponse = await prismaClient.user_page_tracking.findUnique({
    where: {
      user_id: userIdCookie,
    },
  });
  const notValidLogin = dbResponse === null;
  // Not logged in - load the home page
  if (notValidLogin) {
    if (isOnHomePage) return null;
    console.log("redirect home - not valid login");
    redirect("/");
  }
  // on matching target page and current page pass through
  const currentPage = dbResponse.user_page_order[dbResponse.user_page_index];
  if (currentPage === url) {
    return null;
  }
  console.log("redirect page - incorrect page requested");
  redirect(currentPage);
}

export async function getUserId() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user-id")?.value;
  return userId ?? null;
}

export async function getUserAiType(userId: string) {
  const { rows } = await sql<
    Pick<user_page_tracking, "selected_ai" | "causal" | "risk">
  >`
SELECT selected_ai, causal, risk
FROM user_page_tracking
WHERE user_id = ${userId}
`;
  const aiType = rows[0]?.selected_ai;
  const causal = rows[0]?.causal;
  const risk = rows[0]?.risk;
  return { aiType, causal, risk };
}

const disclaimers = {
  "0_0": "CAUTION: AI models are imperfect and can make mistakes. They may give incorrect answers.",
  "0_1": "CAUTION: AI models are unbalanced and can be politically skewed. They may give politically one-sided responses.",
  "1_0": "CAUTION: This AI was trained on imperfect internet data that can contain faulty information. Therefore, it can produce incorrect responses.",
  "1_1": "CAUTION: This AI was trained on unbalanced internet data that can contain politically skewed information. Therefore, it can produce politically one-sided responses.",
} as const;

type DisclaimerKey = keyof typeof disclaimers;

function getDisclaimerText(causal: number, risk: number): string {
  const key = `${causal}_${risk}` as DisclaimerKey;
  return disclaimers[key];
}

export async function getWarningMessage(userId: string) {
  const { causal, risk } = await getUserAiType(userId);
  return getDisclaimerText(causal, risk);
}
