import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('svc_session')?.value;
  const path = request.nextUrl.pathname;

  // ====================================================
  // TEMP BLOCK: Admin & Store routes → infinite loading
  // Remove this block to restore access
  // ====================================================
  if (path.startsWith('/admin') || path.startsWith('/store')) {
    return NextResponse.redirect(new URL('/loading-block', request.url));
  }

  // Protect Admin and Store routes from unauthenticated users
  if ((path.startsWith('/admin') || path.startsWith('/store')) && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Allow next handler
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to specific protected routes (frontend only, APIs are protected internally)
    '/admin/:path*',
    '/store/:path*',
  ],
};