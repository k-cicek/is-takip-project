export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const priorities = ["Urgent", "Regular", "Trivial"];
  return Response.json(priorities);
}
