import { type NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  try {
    const { updateSession } = await import("./lib/supabase/middleware");
    const response = await updateSession(request);
    
    if (!(response instanceof NextResponse)) {
      return NextResponse.next({ request });
    }
    return response;
  } catch (error) {
    console.error('Proxy error:', error instanceof Error ? error.message : String(error));
    return NextResponse.next({ request });
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

