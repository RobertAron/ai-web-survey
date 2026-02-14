export function onRequestError() {
  // required export for instrumentation file
}

export function register() {
  const required = [
    "NEXT_PUBLIC_POSTHOG_KEY",
    "NEXT_PUBLIC_PARTICIPANT_PARTY",
    "OPENAI_API_KEY",
    "POSTGRES_URL_NON_POOLING",
    "POSTGRES_URL",
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  const party = process.env.NEXT_PUBLIC_PARTICIPANT_PARTY;
  if (party !== "democrat" && party !== "republican") {
    throw new Error(
      `NEXT_PUBLIC_PARTICIPANT_PARTY must be "democrat" or "republican", got "${party}"`
    );
  }
}
