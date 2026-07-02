import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  // Allow admin, store, maintenance page, APIs, and Next.js internals
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/store") ||
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/trpc") ||
    pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }

  // Redirect everything else
  return NextResponse.redirect(new URL("/maintenance", req.url));
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};