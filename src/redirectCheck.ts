import { cookies, headers } from "next/headers";
import { prismaClient } from "./database";
import { redirect } from "next/navigation";

export async function redirectCheck() {
  const headersList = headers();
  const url = headersList.get("x-url") || "";
  const userIdCookie = getUserId()
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
  if (dbResponse.current_page === url) {
    return null;
  }
  console.log("redirect page - incorrect page requested");
  redirect(dbResponse.current_page);
}

export function getUserId() {
  const cookieStore = cookies();
  const userId = cookieStore.get("user-id")?.value;
  return userId ?? null;
}
