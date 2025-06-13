import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: "/ingest",
  capture_pageview: "history_change",
  ui_host: "https://us.posthog.com",
});
