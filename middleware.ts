import { updateSession } from "./lib/supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  try {
    const response = await updateSession(request);
    // Ensure we always return a valid NextResponse
    if (!(response instanceof NextResponse)) {
      return NextResponse.next();
    }
    return response;
  } catch (error) {
    // Log error but always return a valid response
    console.error('[MIDDLEWARE] Top-level error:', error instanceof Error ? error.message : String(error));
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
