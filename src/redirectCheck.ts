import { cookies, headers } from "next/headers";
import { prismaClient } from "./database";
import { redirect } from "next/navigation";
import { user_page_tracking } from "@prisma/client";
import { sql } from "@vercel/postgres";
import { match } from "ts-pattern";

export async function redirectCheck() {
  const headersList = headers();
  const url = headersList.get("x-url") || "";
  const userIdCookie = getUserId();
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

export function getUserId() {
  const cookieStore = cookies();
  const userId = cookieStore.get("user-id")?.value;
  return userId ?? null;
}

export async function getUserAiType(userId: string) {
  const { rows } = await sql<
    Pick<
      user_page_tracking,
      "selected_ai" | "control_subtype" | "extra_info_type"
    >
  >`
SELECT selected_ai, control_subtype, extra_info_type
FROM user_page_tracking
WHERE user_id = ${userId}
`;
  const aiType = rows[0]?.selected_ai;
  const controlSubtype = rows[0]?.control_subtype;
  const extraInfoType = rows[0]?.extra_info_type;
  return { aiType, controlSubtype, extraInfoType };
}

// prettier-ignore
const messages = {
  video: null,
  control: null,
  basic: "AI Language Models can make mistakes or be inappropriate.",
  informative: "This AI learned from text across the internet, which includes both facts and biases. Because of this, it may repeat stereotypes or misinformation. Remember, AI isn’t always neutral or correct",
  republican: "This model has been trained on more right-leaning data. Therefore, its responses may reflect conservative viewpoints more than conservative ones.",
  democrat: "This model has been trained on more left-leaning data. Therefore, its responses may reflect liberal viewpoints more than conservative ones.",
};
export async function getWarningMessage(userId: string) {
  const { aiType, controlSubtype, extraInfoType } = await getUserAiType(userId);
  // prettier-ignore
  return match({ extraInfoType, controlSubtype, aiType })
    .with({ extraInfoType: "Video" }, () => messages.video)
    .with({ extraInfoType: "Control" }, () => messages.control)
    .with({ extraInfoType: "Basic" }, () => messages.basic)
    .with({ extraInfoType: "Informative" },() =>messages.informative)
    .with({ extraInfoType: "Directed", aiType: "Republican" },() =>messages.republican)
    .with({ extraInfoType: "Directed", aiType: "Democrat" },() =>messages.democrat)
    .with({ extraInfoType: "Directed", aiType: "Control",controlSubtype:"Democrat" }, () => messages.democrat)
    .with({ extraInfoType: "Directed", aiType: "Control",controlSubtype:"Republican" }, () => messages.republican)
    .with({ extraInfoType: "Directed", aiType: "Control",controlSubtype:"None" }, () => {
      console.error("This should never happen. User is directed-control, but has no subtype", userId)
      return messages.republican;
    })
    .exhaustive();
}
