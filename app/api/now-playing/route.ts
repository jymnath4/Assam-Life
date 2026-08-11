// app/api/now-playing/route.ts
import { getNowPlaying } from "@/lib/radio";

export async function GET() {
  const { track, offset, next } = getNowPlaying();
  return Response.json({ track, offset, next, serverTime: Date.now() });
}