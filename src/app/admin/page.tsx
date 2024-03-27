import { prismaClient } from "@/database";
import { Console } from "node:console";
import { Transform } from "node:stream";

export const dynamic = 'force-dynamic'

const ts = new Transform({
  transform(chunk, _enc, cb) {
    cb(null, chunk);
  },
});
const logger = new Console({ stdout: ts });

function getTable(data: Record<string, any>[]) {
  logger.table(data);
  return (ts.read() || "").toString();
}

export default async function Component() {
  const userTrackingPromise = prismaClient.user_page_tracking.findMany();
  const userResponsesPromise = prismaClient.form_response.findMany();
  const userConverstaionPromise = prismaClient.conversation.findMany();
  const [userTracking, userResponses, userConverstaion] = await Promise.all([
    userTrackingPromise,
    userResponsesPromise,
    userConverstaionPromise,
  ]);
  return (
    <main>
      <h2 className="font-bold text-lg">User Status</h2>
      <pre>{getTable(userTracking)}</pre>
      <h2 className="font-bold text-lg">User Responses</h2>
      <pre>{getTable(userResponses)}</pre>
      <h2 className="font-bold text-lg">User Conversations</h2>
      <pre>
        {getTable(
          userConverstaion.map((ele) => ({
            ...ele,
            conversation: JSON.stringify(ele.conversation),
          }))
        )}
      </pre>
    </main>
  );
}
