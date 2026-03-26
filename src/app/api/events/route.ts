import { listEvents } from "@/lib/events";

export async function GET() {
  const events = await listEvents({ city: "new-york-city" });

  return Response.json({
    data: events,
    meta: {
      source: process.env.EVENT_SOURCE ?? "mock",
      count: events.length,
    },
  });
}
