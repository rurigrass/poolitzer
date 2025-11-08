import { updateSession } from "./lib/supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  // Debug logging to verify proxy is running
  console.log('[PROXY] Request received:', request.nextUrl.pathname);
  console.log('[PROXY] Method:', request.method);
  console.log('[PROXY] Env vars check:', {
    hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  try {
    const response = await updateSession(request);
    console.log('[PROXY] Response status:', response.status);
    console.log('[PROXY] Response type:', response instanceof NextResponse ? 'NextResponse' : 'unknown');
    return response;
  } catch (error) {
    // Log the error for debugging
    console.error('[PROXY] Error:', error);
    console.error('[PROXY] Error stack:', error instanceof Error ? error.stack : 'No stack');
    // Allow request to continue even if proxy fails
    const fallbackResponse = NextResponse.next();
    console.log('[PROXY] Returning fallback response');
    return fallbackResponse;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
