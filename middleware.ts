import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware((auth, req) => {
  // Allow access to the payment page itself
  if (req.nextUrl.pathname === '/payment') {
    return NextResponse.next();
  }

  // Redirect every other route to /scam
  return NextResponse.redirect(new URL('/payment', req.url));
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};