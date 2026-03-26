import { getEventById } from "@/lib/events";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    return Response.json({ error: "Event not found" }, { status: 404 });
  }

  return Response.json({ data: event, meta: { source: process.env.EVENT_SOURCE ?? "mock" } });
}
