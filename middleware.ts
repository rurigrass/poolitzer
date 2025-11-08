import { updateSession } from "./lib/supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";

// TEMPORARY: Using middleware.ts naming for compatibility
// proxy.ts is new in Next.js 16 and may not be fully supported on Vercel yet
export default async function middleware(request: NextRequest) {
  // Debug logging to verify middleware is running
  console.log('[MIDDLEWARE] Request received:', request.nextUrl.pathname);
  console.log('[MIDDLEWARE] Method:', request.method);
  console.log('[MIDDLEWARE] Env vars check:', {
    hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  try {
    const response = await updateSession(request);
    console.log('[MIDDLEWARE] Response status:', response.status);
    return response;
  } catch (error) {
    console.error('[MIDDLEWARE] Error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

