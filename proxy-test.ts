import { type NextRequest, NextResponse } from "next/server";

// Simple test proxy that just logs and continues
export async function proxy(request: NextRequest) {
  console.log('PROXY RUNNING:', request.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

