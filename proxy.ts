import { type NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  try {
    // Use dynamic import to avoid import-time __dirname access
    // This loads Supabase only when the function runs, not at module load time
    const { updateSession } = await import("./lib/supabase/middleware");
    const response = await updateSession(request);
    
    // Ensure we always return a valid NextResponse
    if (!(response instanceof NextResponse)) {
      return NextResponse.next();
    }
    return response;
  } catch (error) {
    // Log error but always return a valid response
    console.error('[PROXY] Top-level error:', error instanceof Error ? error.message : String(error));
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

