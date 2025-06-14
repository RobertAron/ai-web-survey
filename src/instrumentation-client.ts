import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: "/ingest",
  capture_pageview: "history_change",
  ui_host: "https://us.posthog.com",
});

function getCookie(key: string): string | undefined {
  const match = document.cookie.match(new RegExp("(^| )" + key + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : undefined;
}
const userId = getCookie("user-id");
if (userId !== undefined) posthog.identify(userId);
