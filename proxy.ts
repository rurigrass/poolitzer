import { type NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  // Always ensure we return a response, even if everything fails
  try {
    // Use dynamic import to avoid import-time __dirname access
    // This loads Supabase only when the function runs, not at module load time
    const { updateSession } = await import("./lib/supabase/middleware");
    const response = await updateSession(request);
    
    // Ensure we always return a valid NextResponse
    if (!(response instanceof NextResponse)) {
      console.warn('[PROXY] Invalid response type, using NextResponse.next()');
      return NextResponse.next({ request });
    }
    return response;
  } catch (error) {
    // Log error but always return a valid response
    console.error('[PROXY] Top-level error:', error instanceof Error ? error.message : String(error));
    console.error('[PROXY] Error stack:', error instanceof Error ? error.stack : 'No stack');
    // CRITICAL: Always return NextResponse.next() to forward request to routes
    return NextResponse.next({ request });
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

